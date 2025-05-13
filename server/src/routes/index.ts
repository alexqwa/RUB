import { FastifyInstance } from 'fastify';

import { streetRoutes } from './streets';
import { productRoutes } from './products';
import { departamentRoutes } from './departaments';

export async function routes(app: FastifyInstance) {
  await streetRoutes(app);
  await productRoutes(app);
  await departamentRoutes(app);
}
