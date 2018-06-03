import {Router} from 'express';

import setupPostRoutes from './posts.routes';
import setupUserRoutes from './user.routes';

const apiRouter = new Router();

setupPostRoutes(apiRouter);
setupUserRoutes(apiRouter);

export default apiRouter;