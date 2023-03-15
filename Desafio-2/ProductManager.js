const fs = require('fs');

class ProductManager{
    #products;
    #autoID=1;
    #path;

    constructor(pathFile){
        this.#products=[];
        this.#path = pathFile;
    } 
    async addProduct(product){
        try {
            const {title,description,price,thumbnail,code,stock} = product;
            if(!title || !description || !price || !thumbnail || !code || !stock) throw new Error("Error, Todos los campos deben ser completados");
            const productExist = this.#products.find(element=> element.code === product.code);
            if(productExist) throw new Error("Error, Ya existe un producto con el mismo codigo");
            const newProduct = {...product,id: this.#autoID};
            this.#products.push(newProduct);
            this.#autoID = this.#autoID + 1;
            await fs.promises.writeFile(this.#path,JSON.stringify(this.#products),"utf-8");
            return "Productos agregados con éxito!";
        } catch (error) {
           return error.message; 
        }

    }
    async getProducts(pathFile){
        try {
            const products = await fs.promises.readFile(pathFile,"utf-8");
            return JSON.parse(products);     
        } catch (error) {
            throw error.message;
        }

    }
    async getProductById(productId,pathFile){
        try {
            const result = await fs.promises.readFile(pathFile,"utf-8");
            if(!result) throw new Error("No se encontraron productos en el archivo")
            const products = JSON.parse(result);
            const product = products.find(element => element.id === productId);
            if(!product) throw new Error(`El producto con id ${productId} no existe`);
            return product;
        } catch (error) {
            return error.message;
        }

    }

}
const pathFile = "./Productos.json"
const oreos = {
    title:"Oreos",
    description:"Galletitas rellenas",
    price:23,
    thumbnail:"sin foto",
    code:"adfg66",
    stock:15,
}
const mana = {
    title:"Mana",
    description:"Galletitas simples",
    price:12,
    thumbnail:"sin foto",
    code:"adfg46",
    stock:20,
}
const galletitas = new ProductManager(pathFile);

galletitas.addProduct(oreos)
.then(()=>galletitas.addProduct(mana))
.then(result => {
    console.log(result);
    return galletitas.getProducts(pathFile);
})
.then(()=>galletitas.getProductById(3,pathFile))
.then((result)=>console.log(result))
.catch(error=>console.log(error));
