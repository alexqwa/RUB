import { FastifyInstance } from 'fastify';

import { streetRoutes } from './streets';
import { licenseRoutes } from './licenses';
import { departamentRoutes } from './departaments';
import { usersRoutes } from './users';

export async function routes(app: FastifyInstance) {
  await usersRoutes(app);
  await streetRoutes(app);
  await licenseRoutes(app);
  await departamentRoutes(app);
}
