import { cartModel } from "../models/cartModel.js"
import  mongoose  from "mongoose";

class CartMongooseDAO{

    async create(newCart){
        try {
            const cart = await cartModel.create(newCart);
            return {
                id: cart._id.toString(),
                products: cart.products,
                status:cart.status
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateOne(cid,data){
        try {
            const cart = await cartModel.findOneAndUpdate({_id:cid},{$set:{products :data}},{new:true})
            console.log("El carrito en mongoose",cart);
            return {
                id:(cart._id).toString(),
                products:cart.products,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async updateAgregate(cid,pid){
        try {
            console.log("updateAgregate")
            const cart = await cartModel.aggregate([
                {
                    $match:{_id: new mongoose.Types.ObjectId(cid)}
                },
                {
                  $match: {products: {$elemMatch:{pid: {$eq:new mongoose.Types.ObjectId(pid)}}}}
                }
            ])
            console.log("agreggate: ",cart);
        } catch (error) {
            console.log(error);
        }
    }
    
    async find(filter){
        try {
            const carts = await cartModel.find(filter);
            console.log(carts)
            /*
            return carts.map(cart=>({
                id:cart._id,
                products:cart.products,
                status:cart.status
            }));
            */
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findById(cid){
        try {
            const cart = await cartModel.findById(cid);
            return {
                id:(cart._id).toString(),
                products:cart.products,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async findAndModify(cid,data){
        try {
            const cart = await cartModel.findOne({_id:cid},{products:{$elemMatch:{$eq:data._id}}});
            console.log(cart)
            /*return {
                id:cart._id,
                products:cart.products,
                status:cart.status
            };*/
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default CartMongooseDAO;