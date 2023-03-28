import express from 'express';
import ProductManager from './ProductManager.js';

const port = 8083;
const app = express();

app.use(express.urlencoded({extended:true}));

const pathFile = './src/Productos.json'
const pm = new ProductManager(pathFile);

app.get('/products',async (req,res)=>{
     let limit = Number(req.query.limit);
     if (typeof limit !== "number" || isNaN(limit)) {
        res.status(400).send({status:"error",error: "El parámetro id debe ser un número válido" });
        return;
      }
    try {
        const products = await pm.getProducts();
        if(limit){
            const productList = products.slice(0,limit);
            console.log(productList);
            res.send(productList);
            
        }else{
            console.log(products);
            res.send(products);
        }
    } catch (error) {
        res.send({status:"error", error:error.message});
    }
        
});

app.get('/products/:pid',async (req,res)=>{
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

app.listen(port,()=>{
    console.log(`Aplicación corriendo en el puerto ${port}`);
})
