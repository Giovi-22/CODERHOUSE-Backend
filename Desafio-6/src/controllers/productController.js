import ProductManager from '../manager/ProductManager.js';
class ProductController{

    static addProduct = async (req,res,next)=>{
            const product = req.body;
            try {
                const pManager = new ProductManager();
                const newProduct = await pManager.add(product);
                res.status(201).json({status:'success',data:newProduct});
            } catch (error) {
                next({statusCode:error.cause?.statusCode ?? 500, message:error.message});
                return;
            }
    }

    static getProducts = async (req,res,next)=>{
        const options = {
            limit: +req.query.limit || 10,
            page: +req.query.page || 1,
            sort: +req.query.sort || null, //los valores que recibe para ordenar por precio pueden ser 1 (de menor a mayor) y -1 (de mayor a menor)
            filter:JSON.parse(`{${req.query.filter || ""}}`)
        }
        try {
            const pManager = new ProductManager();
            const products = await pManager.get(options);
            res.status(200).json({status:'success',data:products});
        } catch (error) {
            next({statusCode:error.cause?.statusCode ?? 500, message:error.message});
            return;
        }
    }

    static getOneProduct = async (req,res,next)=>{
        const pid = req.params.pid;
        try {
            const pManager = new ProductManager();
            const product = await pManager.getOne(pid);
            res.status(200).json({status:'success',data:product});
        } catch (error) {
            next({statusCode:error.cause?.statusCode ?? 500, message:error.message});
        }
    }


    static updateProduct = async (req,res,next)=>{
        const pid = req.params.pid;
        const data = req.body;
        try {
            const pManager = new ProductManager();
            const productUpdated = await pManager.updateOne(pid,data);
            res.status(200).json({status:'success',data:productUpdated});
        } catch (error) {
            next({statusCode:error.cause?.statusCode ?? 500, message:error.message});
            return;
        }
    }

    static deleteProduct = async (req,res,next)=>{
        const pid = req.params.pid;
        try {
            const pManager = new ProductManager();
            const productDeleted = await pManager.deleteOne(pid);
            res.status(200).json({status:'success',data:productDeleted});
        } catch (error) {
            next({statusCode:error.cause?.statusCode ?? 500, message:error.message});
            return;
        }
    }

}

export default ProductController;