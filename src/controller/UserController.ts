import User from '../model/User';
import CreateUserService from '../services/user/CreateUserService';
import UpdateUserService from '../services/user/UpdateUserServices';

interface RequestCreate {
    name: string,
    email: string,
    password: string
}

interface RequestUpdate {
    id: string,
    name?: string,
    password?: string
}

class UserController {
    public async create({ name, email, password }: RequestCreate): Promise<User> {
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        delete user.password;

        return user;

    }

    public async update({ id, name, password }: RequestUpdate): Promise<User> {
        const updateUserService = new UpdateUserService();

        const updatedUser = await updateUserService.execute({
            id,
            name,
            password
        });

        delete updatedUser.password;

        return updatedUser;
    }
}

export default UserController;