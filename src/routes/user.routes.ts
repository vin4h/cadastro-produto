import { Router } from 'express';

import UserController from '../controller/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const user = await userController.create({
            name,
            email,
            password
        });


        return response.json(user);
    } catch (err) {
        return response.status(400).json({ err: err.message })
    }
});

export default userRouter;