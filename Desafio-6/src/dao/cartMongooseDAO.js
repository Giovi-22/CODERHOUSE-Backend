import { cartModel } from "../models/cartModel.js"


class CartMongooseDAO{

    async create(newCart){
        try {
            const cart = await cartModel.create(newCart);
            return {
                id: cart._id.toString(),
                products: cart.products,
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(cid,data){
        try {
            const cart = await cartModel.findOneAndUpdate({_id:cid},{$set:{products :data}},{new:true})
            return {
                id:(cart._id).toString(),
                products:cart.products.map(product =>({pid:product.pid,quantity:product.quantity}))
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async find(){
        try {
            const carts = await cartModel.find({});
            if(!carts.length){
                throw new Error("No existen carritos en la base de datos");
            }
            return carts.map(cart=>({
                id:cart.id.toString(),
                products: cart.products.map(product =>({pid:product.pid,quantity:product.quantity})),
            }))
        } catch (error) {
            throw new Error(error.message);
        }
    }  
    
    async findById(cid){
        try {
            const cart = await cartModel.findById(cid).populate("products.pid");
            return {
                id:(cart._id).toString(),
                products: cart.products.map(product => ({
                    product:{
                        id:product.pid.id,
                        title:product.pid.title,
                        description: product.pid.description,
                        category: product.pid.category,
                        price: product.pid.price,
                        thumbnail: product.pid.thumbnail,
                        stock: product.pid.stock,
                        code:product.pid.code,
                        status: product.pid.status
                    },
                    quantity: product.quantity,
                })),
                    
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deletAll(cid){
        try {
            return this.update(cid,[]);
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default CartMongooseDAO;