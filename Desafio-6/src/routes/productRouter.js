import { Router } from "express";
import ProductController from "../controllers/productController.js";
import { productValidator } from "../middelwares/productValidator.js";

const pRouter = Router();

pRouter.post('/',productValidator,ProductController.addProduct);
pRouter.get('/',ProductController.getProducts);
pRouter.get('/:pid',ProductController.getOneProduct);
pRouter.put('/:pid',ProductController.updateProduct);
pRouter.delete('/:pid',ProductController.deleteProduct);

export default pRouter;