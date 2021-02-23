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

userRouter.put('/', async (request, response) => {
    try {
        const { id, name, password } = request.body;

        const updateUser = await userController.update({
            id,
            name,
            password
        });

        return response.json({ message: `Usuário ${updateUser.name} foi atualizado` });
    } catch (err) {
        return response.status(400).json({ err: err.message })
    }
});

export default userRouter;