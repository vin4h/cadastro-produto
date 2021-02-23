import { Router } from 'express';

import UserRouter from './user.routes';

const routes = Router();

routes.use('/api/v1/user', UserRouter);

export default routes;