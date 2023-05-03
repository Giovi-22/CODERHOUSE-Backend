import express from 'express';
import path from 'path';




const app = express();
const port = 8083;

app.listen(port,()=>console.log(`Servidor escuchando en el puerto ${port}`));

/*
app.set('views',path.resolve('./views'));
app.set('view engine','ejs');
*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
console.log(path.resolve('/public'))

app.get('/',(req,res)=>{

   res.sendFile(path.resolve('./index.html'))
})
