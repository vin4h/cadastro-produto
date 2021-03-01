import { Router } from 'express';
import ProductController from '../controller/ProductController';

const productRouter = Router();

const productController = new ProductController();

productRouter.post('/', async (request, response) => {
    try {
        const authHeader = request.headers.authorization;

        const { name, amount, value } = request.body;

        const product = await productController.create({
            name,
            amount,
            value,
            authHeader
        });

        response.json(product);
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
});

export default productRouter;