import { Router } from "express";

const viewsRouter = Router();


viewsRouter.get('/',(req,res)=>{
    res.render('index',{saludo:'Giovanni'})
})

export default viewsRouter;