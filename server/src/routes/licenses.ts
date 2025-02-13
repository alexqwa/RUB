import { z } from 'zod';
import dayjs from 'dayjs';
import { v7 } from 'uuid';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function licenseRoutes(app: FastifyInstance) {
  app.post('/generate-license', async (request, reply) => {
    const licenseParams = z.object({
      expiresInDays: z.number().positive().int(),
    });

    try {
      const { expiresInDays } = licenseParams.parse(request.body);
      const createdAt = dayjs();
      const expiresAt = createdAt.add(expiresInDays, 'day');

      const license = await prisma.license.create({
        data: {
          key: v7(),
          createdAt: createdAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
        },
      });

      reply.code(201).send(license);
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply
          .code(400)
          .send({ error: 'Dígito inválido.', details: error.errors });
      } else {
        console.error('Erro ao gerar licença:', error);
        reply.code(500).send({ error: 'Erro interno no servidor!' });
      }
    }
  });

  app.post('/verify-license/:key', async (request, reply) => {
    const licenseParams = z.object({
      key: z.string(),
    });

    try {
      const { key } = licenseParams.parse(request.params);
      const license = await prisma.license.findUnique({
        where: { key },
        include: {
          user: true,
        },
      });

      if (license && dayjs(license.expiresAt).isAfter(dayjs())) {
        return reply.send({ ...license, valid: true });
      } else {
        return reply.send({ valid: false });
      }
    } catch (error) {
      console.error('Error verifying license:', error);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  });

  app.get('/licenses', async (request, reply) => {
    try {
      const licenses = await prisma.license.findMany({
        include: {
          user: true,
        },
      });
      reply.send(licenses);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao buscar licenças.' });
    }
  });

  app.delete('/licenses', async (request, reply) => {
    try {
      const deletedLicenses = await prisma.license.deleteMany({});
      reply.send({
        message: `${deletedLicenses.count} licença(s) deletadas com sucesso.`,
      });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao deletar as licenças.' });
    }
  });

  app.delete('/licenses/:id', async (request, reply) => {
    const licenseParams = z.object({
      id: z.string(),
    });

    const { id } = licenseParams.parse(request.params);

    try {
      await prisma.license.delete({
        where: { id: Number(id) },
      });
      return reply
        .status(200)
        .send({ message: `Licença com ID ${id} deletada com sucesso.` });
    } catch (error) {
      if (error === 'P2025') {
        return reply
          .status(404)
          .send({ message: `Licença com ID ${id} não encontrada.` });
      }
      return reply.status(500).send({ message: 'Erro ao deletar licença!' });
    }
  });
}
