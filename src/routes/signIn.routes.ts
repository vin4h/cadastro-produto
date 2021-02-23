import { Router } from 'express';
import AuthenticateController from '../controller/AuthenticateController';

const signInRouter = Router();

const authController = new AuthenticateController();

signInRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const { user, token } = await authController.signIn({
            email,
            password
        });

        delete user.password;

        return response.json({ user, token });
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
});

export default signInRouter;