import User from "../model/User";
import CreateUserService from "../services/CreateUserService";

interface RequestCreate {
    name: string,
    email: string,
    password: string
}

class UserController {
    public async create({ name, email, password }: RequestCreate): Promise<User> {
        const userService = new CreateUserService();

        const user = await userService.execute({
            name,
            email,
            password
        });

        delete user.password;

        return user;

    }
}

export default UserController;