import { Router } from "express";
import ProductManager from "../src/ProductManager.js";
import path from "path"

const filePath = path.resolve("./src") + "/Products.json";
const pm = new ProductManager(filePath);

const routerProducts = Router();

routerProducts.get('/',async(req,res)=>{
    try {
        const products = await pm.getProducts();
        const limit = Number(req.query.limit) || products.length;
        const productList = products.slice(0,limit);
        return res.status(200).json({status:'success',message:productList});
    } catch (error) {
        res.status(500).send({status:"error",error:"No se pueden obtener los productos, error en el servidor"})
    }  
})

routerProducts.get('/:pid',async (req,res)=>{
    const productId = Number(req.params.pid);
    if (typeof productId !== "number" || isNaN(productId)) {
        res.status(400).send({status:"error",error: "El parámetro id debe ser un número válido" });
        return;
      }
    try {
        const product = await pm.getProductById(productId);
        res.send(product);
    } catch (error) {
        console.log(error.message);
        res.send({status:"error", error:error.message})
    }
        
});

routerProducts.post('/',async (req,res)=>{
    const newProduct = req.body;
    try{
        const result = await pm.addProduct(newProduct);
        res.status(201).send({status:"sucess", message:result})
    }catch(error){
        res.status(500).send({status:"error", error:error.message})
    }        
});

routerProducts.put('/:pid',async (req,res)=>{
    const productId = Number(req.params.pid);
    const productUpdated = req.body;
    if(typeof productId !== "number" || isNaN(productId)){
        res.status(400).send({status:"error",error: "El parámetro id debe ser un número válido" });
        return;
    }
    try{
        const result = await pm.update(productId,productUpdated);
        res.status(201).send({status:"sucess", message:result})
    }catch(error){
        res.status(500).send({status:"error", error:error.message})
    }      

});

export default routerProducts;
