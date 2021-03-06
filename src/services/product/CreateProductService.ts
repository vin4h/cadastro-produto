import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import Product from '../../model/Product';
import User from '../../model/User';

interface Request {
    name: string;
    amount: number;
    value: number;
    user_id: string;
}

class CreateProductService {
    public async execute({ name, amount, user_id, value }: Request): Promise<Product> {
        const userRepository = getRepository(User);

        const productRepository = getRepository(Product);

        const findUser = await userRepository.findOne({
            where: { id: user_id }
        });

        if (!findUser) {
            throw Error('Usuário informado não existe');
        }

        const product = productRepository.create({
            id: v4(),
            name,
            amount,
            value,
            user_id,
            user: findUser
        });
        
        await productRepository.save(product);

        return product;
    }
}

export default CreateProductService;