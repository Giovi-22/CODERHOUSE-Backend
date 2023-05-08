import CartMongooseDAO from "../dao/cartMongooseDAO.js";


class CartManager{
    #cartMongooseDAO;
    constructor(){
        this.#cartMongooseDAO = new CartMongooseDAO();
    }
    
    async createCart(cart){
        try {
            const newCart = await this.#cartMongooseDAO.create(cart) ;
            return newCart;
        } catch (error) {
            throw new Error(error.message);     
        }
    }
    async addOne(cid,pid) {
        try {
            const cart = await this.#cartMongooseDAO.findById(cid);
            const index = cart.products.findIndex(product => product.pid.toString() === pid);
            if(index === -1){
                cart.products.push({pid:pid,quantity:1});
                const updatedCart = await this.#cartMongooseDAO.updateOne(cart.id,cart.products);
                return updatedCart;
            }
            Object.assign(cart.products.at(index),{quantity: (cart.products[index].quantity) + 1});
            const updatedCart = await this.#cartMongooseDAO.updateOne(cart.id,cart.products);
            return updatedCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getAll(){
        try {
            const carts = this.#cartMongooseDAO.find({status:{$ne:false}});
            
            return carts;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getOne(cid){
        try {
            const cart = this.#cartMongooseDAO.findById(cid);
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getWhitFilters(cid,pid){
        try {
            const result = this.#cartMongooseDAO.find({products: {$elemMatch:{pid:pid}}});    
        } catch (error) {
            
        }
    }
    async getMany(cid,data){
        try {
            const carts = this.#cartMongooseDAO.findAndModify(cid,data);
            
        } catch (error) {
            
        }
    }

    async deleteOne(cid){
        try {
            const cart = this.#cartMongooseDAO.updateOne(cid,{status:false});
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default CartManager;