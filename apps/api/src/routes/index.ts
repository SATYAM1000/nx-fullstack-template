import { Express, Router } from 'express';
import { env } from '../config';
import testRouter from './test.route';

interface AppRoute {
  path: string;
  router: Router;
  excludeAPIPrefix?: boolean;
}

const routes: AppRoute[] = [{ path: '/test', router: testRouter }];

export const registerRoutes = (app: Express): void => {
  routes.forEach(({ path, router, excludeAPIPrefix }) => {
    const routePath = excludeAPIPrefix ? path : `${env.API_PREFIX}${path}`;
    app.use(routePath, router);
  });
};
