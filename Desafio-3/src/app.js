import express, { urlencoded } from 'express';

import ProductManager from './ProductManager.js';
import { productList } from '../Resources/products.js';

const port = 8083;
const app = express();
app.use(express.urlencoded({extended:true}));

const pathFile = './ProductsFile/Productos.json'

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
        console.log(error);
        res.send(error);
    }
        
});

app.get('/products/:pid',async (req,res)=>{
    const productId = +req.params.pid;
    try {
        const product = await pm.getProductById(productId);
        console.log(product);
        res.send(product);

    } catch (error) {
        console.log(error);
        res.send(error);
    }
        
});

app.listen(port,()=>{
    console.log(`Aplicación corriendo en el puerto ${port}`);
})
