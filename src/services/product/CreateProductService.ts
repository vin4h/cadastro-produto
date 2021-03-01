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
            relations: ['products'],
            where: { user_id }
        });

        if (!findUser) {
            throw Error("Usuário informado não existe");
        }

        const findProduct: Product[] = findUser.products.filter(product => product.name === name);

        if (findProduct) {
            const updateExistProduct = productRepository.create({
                id: findProduct[0].id,
                name: findProduct[0].name,
                value,
                amount: findProduct[0].amount + amount,
                user_id
            });

            await productRepository.save(updateExistProduct);

            return updateExistProduct;
        }

        const product = productRepository.create({
            id: v4(),
            name,
            amount,
            value,
            user_id
        });

        await productRepository.save(product);

        return product;
    }
}

export default CreateProductService;