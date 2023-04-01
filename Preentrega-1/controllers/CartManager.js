import fs from 'fs/promises';

class CartManager{
        #cartID;
        #path;
        #carts;

        constructor(path){
            this.#cartID = 1;
            this.#path = path;
            this.#carts = [];
        }
        
        async _loadData(){
            try {
                const cartFile = await fs.readFile(this.#path,{encoding:"utf-8"});
                const products = JSON.parse(cartFile);
                this.#carts = [...products];
                return "datos cargados";
            } catch (error) {
                console.log("El carrito no existe \nCreando archivo...");
                await fs.writeFile(this.#path,JSON.stringify([],null,2),"utf-8");
                return "Carrito creado con éxito!";      
            }
        }

        async create(){
            try {
                await this._loadData();
                this.#carts.length === 0 ? this.#carts.push({id:this.#cartID,products:[]}) : this.#carts.push({id:(this.#carts.at(-1).id)+1,products:[]});
                await fs.writeFile(this.#path,JSON.stringify(this.#carts,null,2),"utf-8");
                this.#cartID += 1;
                return "Carrito creado"; 
            } catch (error) {
                throw new Error(error.message);     
            }
        }
    async add(cartId,productId) {
            try {
                const cartProducts = (await this.get(cartId)).products;
                
                const productIndex = cartProducts.findIndex(element => element.id === productId);
                productIndex != -1 ? cartProducts[productIndex].cuantity += 1 : cartProducts.push({id:productId,cuantity:1});
                
                const cartIndex = this.#carts.findIndex(element => element.id === cartId);
                Object.assign(this.#carts.at(cartIndex),{id:cartId,products:[...cartProducts]});

                await fs.writeFile(this.#path,JSON.stringify(this.#carts,null,2),"utf-8");
                return "Producto agregado";
            } catch (error) {
                throw new Error(error.message);
            }
    }
    async get(cartId){
        try {
            await this._loadData();
            const cartFinded = this.#carts.find(element => element.id === cartId);
            if(!cartFinded){
                throw new Error("El carrito no existe");
            }
            return cartFinded;
        } catch (error) {
            throw new Error(`No se pudo obtener el carrito. error: ${error.message}`);
        }
    }

}

export default CartManager;