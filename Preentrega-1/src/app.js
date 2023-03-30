import Express from "express";
import routerProducts from "../routes/products.router.js";

const app = Express();
const port = 8083;


app.use(Express.json());
app.use(Express.urlencoded({extended:true}));

app.use('/api/products/',routerProducts);


app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`);
});