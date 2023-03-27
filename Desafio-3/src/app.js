import express from 'express';
import ProductManager from './ProductManager.js';

const port = 8083;
const app = express();

app.use(express.urlencoded({extended:true}));

const pathFile = './src/Productos.json'

const pm = new ProductManager(pathFile);

app.get('/products',async (req,res)=>{
     let limit = +req.query.limit;
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
        res.send({status:"error", error:error});
    }
        
});

app.get('/products/:pid',async (req,res)=>{
    const productId = +req.params.pid;
    if (typeof productId !== "number" || isNaN(productId)) {
        res.status(400).send({status:"error",error: "El parámetro id debe ser un número válido" });
        return;
      }
    try {
        const product = await pm.getProductById(productId);
        console.log(product);
        res.send(product);

    } catch (error) {
        res.status(500).send({status:"error", error:error})
    }
        
});

app.listen(port,()=>{
    console.log(`Aplicación corriendo en el puerto ${port}`);
})
