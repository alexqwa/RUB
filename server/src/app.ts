import dayjs from 'dayjs';
import cron from 'node-cron';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes';
import { prisma } from './lib/prisma';

const app = Fastify();

app.register(cors);
app.register(routes);

cron.schedule('0 0 * * *', async () => {
  try {
    const now = dayjs().toISOString();
    await prisma.license.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });
    console.log('Licenças expiradas removidas com sucesso!');
  } catch (error) {
    console.log('Erro ao remover licenças expiradas:', error);
  }
});

app
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log('HTTP Server Running!'));
