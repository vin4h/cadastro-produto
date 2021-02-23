import { Router } from 'express';
import UserController from '../controller/UserController';

const user = Router();

const userController = new UserController();

user.get('/', (request, response) => {
    response.json({ 'message': 'OK' });
});