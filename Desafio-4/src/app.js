import express from 'express';
import path from 'path';
import {Server} from 'socket.io';
import viewsRouter from './routes/viewsRouter.js';


const app = express();
const port = 8083;

const httpServer = app.listen(port,()=>console.log(`Servidor escuchando en el puerto ${port}`));
const socketServer = new Server(httpServer);

app.set('views',path.resolve('./src/views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('./src/public')));

app.get('/',viewsRouter);



socketServer.on('connection',socket=>{
    console.log('Nuevo cliente conectado')
    socket.on('messageChrome',(value)=>{
        console.log("El cliente envió un mensaje: ",value)
    })
    socket.on('messageFirefox',(value)=>{
        console.log("El cliente envió un mensaje: ",value)
    })
})