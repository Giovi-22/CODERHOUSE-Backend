import Express from "express";

const app = Express();
const port = 8083;




app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`);
});