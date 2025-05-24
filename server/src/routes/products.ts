import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function productRoutes(app: FastifyInstance) {
  app.post('/streets/:streetCode/products', async (request, reply) => {
    const createProductBody = z.object({
      code: z.number(),
      title: z.string(),
      stock: z.number(),
    });

    const streetParams = z.object({
      streetCode: z.string(),
    });

    const { streetCode } = streetParams.parse(request.params);
    const { code, title, stock } = createProductBody.parse(request.body);

    try {
      const street = await prisma.street.findUnique({
        where: { code: streetCode },
      });

      if (!street) {
        return reply.status(404).send({ error: 'Street não encontrada' });
      }

      const newProduct = await prisma.product.create({
        data: {
          code,
          title,
          stock,
          streetCode: street.code,
        },
      });

      reply.status(201).send(newProduct);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar o produto' });
    }
  });

  app.get('/streets/:streetCode/products', async (request, reply) => {
    const streetParams = z.object({
      streetCode: z.string(),
    });

    const { streetCode } = streetParams.parse(request.params);

    try {
      const products = await prisma.product.findMany({
        where: { streetCode: String(streetCode) },
      });

      reply.send(products);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar os produtos' });
    }
  });

  app.delete('/streets/:streetCode/products/random', async (request, reply) => {
    const streetParams = z.object({
      streetCode: z.string(),
    });

    const { streetCode } = streetParams.parse(request.params);

    try {
      const products = await prisma.product.findMany({
        where: { streetCode: streetCode },
        select: { id: true },
      });

      const totalProducts = products.length;
      const nToDelete =
        totalProducts > 0 ? Math.floor(Math.random() * totalProducts) + 1 : 0;

      if (nToDelete === 0) {
        return reply.send({
          message: 'Nenhum produto encontrado para deletar',
        });
      }

      function getRandomElements<T>(array: T[], n: number): T[] {
        const shuffled = array.slice().sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
      }

      const productsToDelete = getRandomElements(products, nToDelete);
      const idsToDelete = productsToDelete.map((product) => product.id);

      await prisma.product.deleteMany({
        where: {
          id: { in: idsToDelete },
        },
      });

      reply.send({
        message: `Deletados ${nToDelete} produtos com IDs: ${idsToDelete.join(', ')}`,
      });
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao deletar os produtos' });
    }
  });

  app.delete(
    '/streets/:streetCode/products/percent',
    async (request, reply) => {
      const streetParams = z.object({
        streetCode: z.string(),
      });

      const { streetCode } = streetParams.parse(request.params);

      try {
        const totalProducts = await prisma.product.count({
          where: { streetCode: streetCode },
        });

        console.log(
          `Total de produtos na rua ${streetCode} antes da redução: ${totalProducts}`
        );

        if (totalProducts === 0) {
          return reply.send({
            message: 'Nenhum produto encontrado para deletar',
          });
        }

        // Quantidade máxima permitida para ficar abaixo de 1%
        const maxAllowed = Math.floor(totalProducts * 0.01);

        if (maxAllowed >= totalProducts) {
          return reply.send({
            message:
              'A quantidade de produtos já está abaixo de 1%. Nenhuma ação necessária.',
          });
        }

        // Quantidade a deletar para ficar abaixo de 1%
        const nToDelete = totalProducts - maxAllowed - 1; // -1 para garantir < 1%

        if (nToDelete <= 0) {
          return reply.send({
            message: 'Já está abaixo de 1%, não é necessário deletar.',
          });
        }

        // Buscar todos os IDs dos produtos da rua
        const allProducts = await prisma.product.findMany({
          where: { streetCode: String(streetCode) },
          select: { id: true },
        });

        // Função para obter n elementos aleatórios de um array
        function getRandomElements<T>(array: T[], n: number): T[] {
          const shuffled = array.slice().sort(() => 0.5 - Math.random());
          return shuffled.slice(0, n);
        }
        const productsToDelete = getRandomElements(allProducts, nToDelete);
        const idsToDelete = productsToDelete.map((p) => p.id);

        // Deletar produtos selecionados
        await prisma.product.deleteMany({
          where: { id: { in: idsToDelete } },
        });
        // Consultar total após deleção
        const totalAfter = await prisma.product.count({
          where: { streetCode: String(streetCode) },
        });
        return reply.send({
          message: `Deletados ${nToDelete} produtos para ficar abaixo de 1%.`,
          deletedProductIds: idsToDelete,
          totalBefore: totalProducts,
          totalAfter,
          percentageAfter:
            ((totalAfter / totalProducts) * 100).toFixed(2) + '%',
        });
      } catch (error) {
        console.error('Erro ao reduzir produtos:', error);
        reply
          .status(500)
          .send({ error: 'Erro ao reduzir a quantidade de produtos.' });
      }
    }
  );

  app.delete('/streets/:streetCode/products/all', async (request, reply) => {
    const streetParams = z.object({
      streetCode: z.string(),
    });

    const { streetCode } = streetParams.parse(request.params);

    try {
      await prisma.product.deleteMany({
        where: { streetCode: String(streetCode) },
      });

      reply.send({ message: 'Todos os produtos deletados com sucesso.' });
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao deletar os produtos' });
    }
  });
}
