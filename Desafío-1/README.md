#                                                              CURSO BACKEND CODERHOUSE
# DESAFIO-1 

## CONSIGNA
- Realizar una clase "ProductManager" que gestione un conjunto de productos.
- Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
- Cada producto que gestione debe contar con las siguientes propiedades:
    * title (nombre del producto)
    * description (descripción del producto)
    * price (precio)
    * thumbnail (ruta para la imagen)
    * code (código identificador del producto)
    * stock (número de piezas disponibles)
- Debe contar con un método "addProduct" el cual agregará un producto al arreglo de productos inicial.
    * Validar que no se repita el campo "code" y que todos los campos sean obligatorios
    * El producto debe crearse con un id autoincrementable
- Debe contar con un método "getProducts" el cual debe devolver el arreglo con todos los productos creados hasta ese momento
- Debe contar con un método "getProductById" el cual debe buscar en el arreglo el producto que coincida con el id
    * En caso de no coincidir ningún id, mostrar en consola un error, de lo contrario mostrar el producto

## TESTS
- Crear un instancia de la clase ProductManager
- llamar al método getProducts recién creada la instancia, debe mostrar el arreglo vacío.
- Llamar al método addProduct y pasarle un producto con todos los campos necesarios.
- El objeto debe agregarse satisfactoriamente con un id generado automaticamente sin repetirse.
- llamar al método getProducts nuevamente, esta vez mostrar el/los productos que hayan sido agregados.
- Llamar al método addProduct con un producto que se haya agregado anteriormente y este deberá arrojar un error porque el código estará repetido.
- Evaluar que getProductById devuelva un error si no encuentra el producto o de lo contrario que devuelva el producto buscado.
