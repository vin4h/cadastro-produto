import Product from '../model/Product';
import User from '../model/User';
import CreateProductService from '../services/product/CreateProductService';
import FindProductService from '../services/product/FindProductService';
import ListProductService from '../services/product/ListProductService';
import UpdateProductService from '../services/product/UpdateProductService';
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
        const createService = new CreateProductService();

        const dataAuth = await this.getUserIdFromAuthentication({ authHeader });

        const product = await createService.execute({
            name,
            amount,
            value,
            user_id: dataAuth.id
        });

        return this.formatedProduct(product);

    }

    public async list({ authHeader }: Partial<Request>): Promise<Product[]> {
        const listService = new ListProductService();

        const dataAuth = await this.getUserIdFromAuthentication({ authHeader });

        const products = await listService.execute({
            user_id: dataAuth.id
        });

        return products;
    }

    public async update({ authHeader, id, name, value, amount }: Partial<Request>): Promise<ProductFormated> {
        const updateService = new UpdateProductService();

        const dataAuth = await this.getUserIdFromAuthentication({
            authHeader
        });

        const updatedProduct = await updateService.execute({
            id,
            name,
            amount,
            value,
            user_id: dataAuth.id
        });

        delete updatedProduct.user.products;

        return this.formatedProduct(updatedProduct);
    }

    public async find({ id, authHeader }: Partial<Request>): Promise<ProductFormated> {
        const findService = new FindProductService();

        const dataAuth = await this.getUserIdFromAuthentication({
            authHeader
        });

        const founderProduct = await findService.execute({
            id,
            user_id: dataAuth.id
        });

        return this.formatedProduct(founderProduct);
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

        delete productFormated.user.password;

        return productFormated;
    }

    private async getUserIdFromAuthentication({ authHeader }: Partial<Request>): Promise<User> {
        const authController = new AuthController();

        const auth = await authController.authenticate({
            authHeader
        });

        delete auth.user.password;

        return auth.user;
    }

}

export default ProductController;