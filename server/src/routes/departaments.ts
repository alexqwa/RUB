import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function departamentRoutes(app: FastifyInstance) {
  app.post('/departaments', async (request) => {
    const createDepartamentBody = z.object({
      title: z.string(),
      isActive: z.boolean(),
      weekdays: z.array(z.number().min(0).max(6)),
    });

    const { title, isActive, weekdays } = createDepartamentBody.parse(
      request.body
    );

    await prisma.departament.create({
      data: {
        title,
        isActive,
        weekdays: {
          create: weekdays.map((weekDay) => ({ day: weekDay })),
        },
      },
    });
  });

  app.get('/departaments', async (request, reply) => {
    const departaments = await prisma.departament.findMany({
      include: {
        weekdays: true,
        streets: {
          select: {
            code: true,
            title: true,
            isActive: true,
            departamentId: true,
            product: true,
          },
        },
      },
    });
    reply.send(departaments);
  });

  app.delete('/departaments/:id', async (request, reply) => {
    const deleteDepartamentBody = z.object({
      id: z.string(),
    });

    const { id } = deleteDepartamentBody.parse(request.params);

    try {
      await prisma.departament.delete({
        where: { id: Number(id) },
      });
      return reply
        .status(200)
        .send({ message: `Departamento com ID ${id} deletado com sucesso!` });
    } catch (error) {
      if (error === 'P2025') {
        return reply
          .status(404)
          .send({ message: `Departamento com ID ${id} não encontrado.` });
      }
      return reply
        .status(500)
        .send({ message: 'Erro ao deletar um departamento!' });
    }
  });
}
