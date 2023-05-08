import { Router } from "express";
import CartController from "../controllers/cartController.js";



const cartRouter = Router();

cartRouter.get('/',CartController.getAll);
//cartRouter.get('/:cid',CartController.get);
cartRouter.get('/:cid/product/:pid',CartController.get);
cartRouter.post('/',CartController.create);
cartRouter.post('/:cid/product/:pid',CartController.addOne);
cartRouter.put('/:cid/',CartController.updateCart);
cartRouter.delete('/:cid',CartController.delete);

export default cartRouter;