class ProductManager{
    #products;
    #autoID=1;

    constructor(){
        this.#products=[];
    } 
    addProduct(product){
        try {
            const {title,description,price,thumbnail,code,stock} = product;

            if(!title || !description || !price || !thumbnail || !code || !stock) throw new Error("Error, Todos los campos deben ser completados");
            const productExist = this.#products.find(element=> element.code === product.code);
            if(productExist) throw new Error("Error, Ya existe un producto con el mismo codigo");
            const newProduct = {...product,id: this.#autoID};
            this.#products.push(newProduct);
            this.#autoID = this.#autoID + 1;
            return "Productos agregados con éxito!";
        } catch (error) {
           return error.message; 
        }

    }
    getProducts(){
        return this.#products;
    }
    getProductById(productId){
        try {
            const product = this.#products.find(element => element.id === productId);
            if(!product) throw new Error(`El producto con id ${productId} no existe`);
            return product;
        } catch (error) {
            return error.message;
        }

    }

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



const galletitas = new ProductManager()
console.log("Productos: ",galletitas.getProducts())

productList.forEach((product)=>console.log(galletitas.addProduct(product)));
console.log("Productos: ",galletitas.getProducts());

console.log(galletitas.addProduct(productList[1]));
console.log(galletitas.getProductById(1));
console.log(galletitas.getProductById(4));
