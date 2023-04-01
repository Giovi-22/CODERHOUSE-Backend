import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import CartManager from "../controllers/CartManager.js";
import path from "path"

const cartRouter = Router();
const pm = new ProductManager(path.resolve("./db") + "/Products.json");
const cm = new CartManager(path.resolve("./db") + "/Cart.json")

cartRouter.post('/',async (req,res)=>{
        try {
            const result = await cm.create();
            res.status(201).send({status:"sucess", message:result})
        } catch (error) {
            res.status(500).json({status:"error", error:error.message})
        }
});

cartRouter.post('/:cid/product/:pid',async (req,res)=>{
        const cartId = +req.params.cid;
        const productId = +req.params.pid;
        const cuantity = req.body.cuantity;
        //console.log("cart id es: ",cartId);
        //console.log("product id es: ",productId);
        //console.log("la cantidad es: ",cuantity);
        try {
            const result = await cm.add(cartId,productId,cuantity);
            res.status(201).send({status:"sucess", message:result})
        } catch (error) {
            res.status(500).json({status:"error", error:error.message})
        }
});

cartRouter.get('/:cid',async (req,res)=>{
        const cartId = +req.params.cid;
        if (isNaN(cartId)) {
            res.status(400).send({status:"error",error: "El parámetro id debe ser un número válido" });
            return;
          }
        try {
            const result = await cm.get(cartId);
            res.status(201).send({status:"sucess", message:result})
        } catch (error) {
            res.status(500).json({status:"error", error:error.message})
        }
});



export default cartRouter;