import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function streetRoutes(app: FastifyInstance) {
  app.post('/streets', async (request) => {
    const createStreetBody = z.object({
      code: z.string(),
      title: z.string(),
      isActive: z.boolean(),
      weekday: z.number().min(0).max(6),
      departamentId: z.number(),
    });

    const { code, title, isActive, weekday, departamentId } =
      createStreetBody.parse(request.body);

    await prisma.street.create({
      data: {
        code,
        title,
        isActive,
        weekday,
        departament: { connect: { id: departamentId } },
      },
    });
  });

  app.get('/departaments/:id/streets', async (request, reply) => {
    const streetParams = z.object({
      id: z.string(),
    });

    const { id } = streetParams.parse(request.params);

    const streets = await prisma.street.findMany({
      where: { departamentId: Number(id) },
    });
    reply.send(streets);
  });
}
