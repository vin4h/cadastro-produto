import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';
import { v4 } from 'uuid';

interface Request {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const findUser = await userRepository.findOne({
            where: { email }
        });

        if (findUser) {
            throw Error("E-mail já está sendo utilizado");
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            id: v4(),
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;