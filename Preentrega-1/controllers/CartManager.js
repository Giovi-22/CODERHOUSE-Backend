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
                if(this.#carts.length === 0){
                    const newCart = {
                        id:this.#cartID,
                        products:[]
                    }
                    this.#carts.push(newCart);
                }else{
                    const lastID = this.#carts.at(-1).id;
                    const newCart = {
                        id:lastID + 1,
                        products:[]
                    }
                    this.#carts.push(newCart);
                }
                await fs.writeFile(this.#path,JSON.stringify(this.#carts,null,2),"utf-8");
                this.#cartID += 1;
                return "Carrito creado"; 
            } catch (error) {
                throw new Error(error.message);     
            }
        }
    async add(cartId,productId,cuantity) {
            try {
                const cartProducts = await this.get(cartId);
                if(!cartProducts.length){
                    const newProduct = {
                        id: productId,
                        cuantity: cuantity
                    }
                    console.log("pasa por aca")
                    cartProducts.push(newProduct);
                }else{
                    const index = cartProducts.findIndex(element => element.id === productId);
                    console.log("el indice es: ",index)
                    index != -1 ? cartProducts[index].cuantity += cuantity : cartProducts.push({id:productId,cuantity:cuantity});
                }
                this.#carts.forEach(element => {
                    if(element.id === cartId){
                        element = {id:cartId,products:[...cartProducts]};
                    }
                });
                
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
            return cartFinded.products;
        } catch (error) {
            throw new Error(`No se pudo obtener el carrito. error: ${error.message}`);
        }
    }

}

export default CartManager;