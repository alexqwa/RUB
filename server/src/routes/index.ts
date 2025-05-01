import { FastifyInstance } from 'fastify';

import { streetRoutes } from './streets';
import { departamentRoutes } from './departaments';

export async function routes(app: FastifyInstance) {
  await streetRoutes(app);
  await departamentRoutes(app);
}
