const fs = require('fs');

class ProductManager{
    #products;
    #autoID=1;
    #path;

    constructor(pathFile){
            this.#path = pathFile;
            this.#products = [];
    } 
    async loadData(){
        try {
            console.log("ejecutando loadData")
            const productsFile = await this.getProducts();
            this.#products=productsFile;
            return "Datos cargados con éxito!";
        } catch (error) {
            return error.message;
        } 
    }
    async addProduct(product){
        try {
            const {title,description,price,thumbnail,code,stock} = product;

            if(!title || !description || !price || !thumbnail || !code || !stock){
                throw new Error("Error, Todos los campos deben ser completados");
            }
            const productExist = this.#products.find(element=> element.code === product.code);
            if(productExist){
                throw new Error("Error, Ya existe un producto con el mismo codigo");
            }
            const newProduct = {...product,id: this.#autoID};
            this.#products.push(newProduct);
            this.#autoID = this.#autoID + 1;
            await fs.promises.writeFile(this.#path,JSON.stringify(this.#products),"utf-8");
            return "Producto agregado con éxito!";
        } catch (error) {
            return error.message; 
        }

    }
    async getProducts(callback){
        try {
            console.log("ejecutando getProducts")
            const productsFile = await fs.promises.readFile(this.#path,"utf-8");
            return JSON.parse(productsFile);    
        } catch (error) {
            console.log("El archivo no existe");
            console.log(`creando ${this.#path} ...`);
            await fs.promises.writeFile(this.#path,JSON.stringify([]),"utf-8");
            return [];
           
        }
        }

    async getProductById(productId){
        try {
            if(!productId || typeof productId !== "number"){
                throw new Error("EL id es incorrecto");
            }
            const result = await fs.promises.readFile(this.#path,"utf-8");
            if(!result){
                throw new Error("No se encontraron productos en el archivo");
            }
            const products = JSON.parse(result);
            const product = products.find(element => element.id === productId);
            if(!product){
                throw new Error(`El producto con id ${productId} no existe`);
            }
            return product;
        } catch (error) {
            return `No se pudo obtener el producto: ${error.message}`;
        }

    }

    async update(productId,product){
        try {
            const products = await this.getProducts();
            if(products.lenght === 0){
                throw new Error("La lista esta vacía")
            }
            const wantedProduct = products.find(element => element.id === productId);
            if(!wantedProduct){
                throw new Error(`El producto con id ${productId} no existe`);
            }
            const updatedProduct = {...wantedProduct,...product}
            const updatedList = updateList(updatedProduct,products);
            this.#products = [...updatedList];
            await fs.promises.writeFile(this.#path,JSON.stringify(updatedList),"utf-8");
            return "Productos actualizados con éxito";
        } catch (error) {
            return error.message;
        }
    }
    async delete(productId){         
            try {
                const products = await this.getProducts();
                const newProducts  = products.filter(element => element.id !== productId);
                this.#products = [...newProducts];
                await fs.promises.writeFile(this.#path,JSON.stringify(this.#products),"utf-8");
                return "Elemento eliminado! "
            } catch (error) {
                return error.message;
            }
    }

}
const updateList = (product,productlist)=>{
    const index = productlist.findIndex(element => element.id === product.id);
    if(index === -1){
       throw new Error("el producto no se encuentra");
    } 
    productlist.splice(index,1,product);
    return productlist;
}

const pathFile = "./Productos.json"
const oreos = {
    title:"Oreos",
    description:"Galletitas rellenas con crema blanca",
    price:55,
    thumbnail:"con foto",
    code:"adfg66",
    stock:5
}
const mana = {
    title:"Mana",
    description:"Galletitas simples",
    price:12,
    thumbnail:"sin foto",
    code:"adfg46",
    stock:20,
}
const productList=[
    {
        title:"Oreos",
        description:"Galletitas rellenas",
        price:23,
        thumbnail:"sin foto",
        code:"adfg66",
        stock:15,
    },
    {
        title:"Mana",
        description:"Galletitas simples",
        price:12,
        thumbnail:"sin foto",
        code:"adfg46",
        stock:20,
    },
    {
        title:"Pepitos",
        description:"Galletitas con chips de chocolate",
        price:22,
        thumbnail:"sin foto",
        code:"adfg13",
        stock:15,
    }
]

const main = async ()=>{
    try {
        const galletitas = new ProductManager(pathFile);
        console.log(await galletitas.loadData());
        /*
        console.log(await galletitas.addProduct(productList[0]));
        console.log(await galletitas.addProduct(productList[1]));
        console.log(await galletitas.addProduct(productList[2]));
        console.log(await galletitas.getProducts());
        console.log("Actualizando productos...\n");
        console.log(await galletitas.update(1,oreos));
        console.log(await galletitas.getProducts());
        console.log("Borrando productos...\n");
        console.log(await galletitas.delete(2));
        console.log(await galletitas.getProducts());
        console.log("Agregando producto...\n");
        console.log(await galletitas.addProduct(mana));
        console.log(await galletitas.getProducts());
*/
    } catch (error) {
        console.log(error)
    }

}

main();
