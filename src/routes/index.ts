import { Router } from 'express';

import UserRouter from './user.routes';
import SignInRouter from './signIn.routes';

const routes = Router();

routes.use('/api/v1/user', UserRouter);
routes.use('/api/v1/signin', SignInRouter);

export default routes;