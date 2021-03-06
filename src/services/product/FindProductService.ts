import { getRepository } from "typeorm";
import Product from "../../model/Product";

interface Request {
    id: string;
    user_id: string;
}

class FindProductService {
    public async execute({ id, user_id }: Request): Promise<Product> {
        const productRepository = getRepository(Product);

        const findProduct = await productRepository.findOne({
            relations: ['user'],
            where: {
                id,
                user_id
            }
        });
        
        if (!findProduct) {
            throw Error("Produto não existe");
        }

        return findProduct;
    }
}

export default FindProductService;