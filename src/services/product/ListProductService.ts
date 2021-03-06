import { getRepository } from "typeorm";
import Product from "../../model/Product";

interface Request {
    user_id: string;
}

class ListProductService {
    public async execute({ user_id }: Request): Promise<Product[]> {
        const productRepository = getRepository(Product);

        const listProduct = productRepository.find({
            where: { user_id }
        });

        return listProduct;
    }
}

export default ListProductService;