import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const createUserBody = z.object({
      name: z.string(),
      lastName: z.string(),
      licenseKey: z.string(),
    });

    try {
      const { name, lastName, licenseKey } = createUserBody.parse(request.body);
      const license = await prisma.license.findUnique({
        where: { key: licenseKey },
      });

      if (!license) {
        return reply.status(404).send({ error: 'Licença não encontrada!' });
      }

      const userWithLicense = await prisma.user.findUnique({
        where: {
          licenseId: license.id,
        },
      });

      if (userWithLicense) {
        return reply
          .status(400)
          .send({ error: 'Licença já está associada a um usuário!' });
      }

      const user = await prisma.user.create({
        data: {
          name,
          lastName,
          licenseId: license.id,
        },
      });

      return reply.status(201).send(user);
    } catch (error) {
      return reply
        .status(500)
        .send({ error: 'Ocorreu um erro ao criar um usuário!' });
    }
  });
}
