import { Router } from 'express';
import AuthenticateController from '../controller/AuthenticateController';

const authRouter = Router();

const authenticateController = new AuthenticateController();

authRouter.post('/', async (request, response) => {
    try {
        const authHeader = request.headers.authorization;

        const { user, token } = await authenticateController.authenticate({
            authHeader
        });

        delete user.password;

        return response.json({ user, token });

    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
});

export default authRouter;

