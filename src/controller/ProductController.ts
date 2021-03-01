import Product from '../model/Product';
import User from '../model/User';
import CreateService from '../services/product/CreateProductService';
import AuthController from './AuthenticateController';

interface Request {
    id: string;
    name: string;
    amount: number;
    value: number;
    authHeader: string;
}

interface ProductFormated {
    id: string;
    name: string;
    amount: number;
    value: string;
    user_id: string;
    user: User;
}


class ProductController {
    public async create({ name, amount, value, authHeader }: Partial<Request>): Promise<ProductFormated> {
        const createService = new CreateService();

        const authController = new AuthController();

        const auth = await authController.authenticate({
            authHeader
        });

        const user_id = auth.user.id;

        const product = await createService.execute({
            name,
            amount,
            value,
            user_id
        });

        console.log(product);
        
        return this.formatedProduct(product);

    }

    private formatedProduct({ id, name, amount, value, user_id, user }: Product): ProductFormated {
        const valueFormated = new Intl.NumberFormat('pt-BT', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);

        const productFormated: ProductFormated = {
            id: id,
            name: name,
            amount: amount,
            value: valueFormated,
            user_id: user_id,
            user: user
        };

        console.log(user)

        delete productFormated.user.password;

        return productFormated;
    }

}

export default ProductController;