import { Router } from 'express';

import UserRouter from './user.routes';
import SignInRouter from './signIn.routes';
import AuthRouter from './auth.routes';
import ProductRouter from './product.routes';

const routes = Router();

routes.use('/api/v1/user', UserRouter);
routes.use('/api/v1/signin', SignInRouter);
routes.use('/api/v1/auth', AuthRouter);
routes.use('/api/v1/product', ProductRouter);

export default routes;