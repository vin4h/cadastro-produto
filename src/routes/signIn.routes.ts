import { Router } from 'express';
import SignInController from '../controller/SignInController';

const signInRouter = Router();

const signInController = new SignInController();

signInRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const { user, token } = await signInController.signIn({
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