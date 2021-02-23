import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../../model/User';

interface Request {
    id: string,
    name?: string,
    password?: string
}

class UpdateUserService {
    public async execute({ name, password, id }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const findUser = await userRepository.findOne({
            where: {
                id
            }
        });

        if (!findUser) {
            throw Error('Usuário não encontrado');
        }

        let hashedPassword;

        if (password) {
            hashedPassword = await hash(password, 8);
        }

        const user = userRepository.create({
            id: findUser.id,
            name: name ? name : findUser.name,
            password: hashedPassword ? hashedPassword : findUser.password
        });

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserService;