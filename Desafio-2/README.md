#                                                              CURSO BACKEND CODERHOUSE
# DESAFIO-2 

## CONSIGNA
-Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. 
 Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos.

- La clase debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

- Cada producto que gestione debe contar con las siguientes propiedades:
    * title (nombre del producto)
    * description (descripción del producto)
    * price (precio)
    * thumbnail (ruta para la imagen)
    * code (código identificador del producto)
    * stock (número de piezas disponibles)
- Debe contar con un método "addProduct" el cual agregará un producto al arreglo de productos inicial y guardar el arreglo en el archivo.
    * Validar que no se repita el campo "code" y que todos los campos sean obligatorios
    * El producto debe crearse con un id autoincrementable
- Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
- Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto.
- Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID.
- Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.


## TESTS
- Crear un instancia de la clase ProductManager
- llamar al método getProducts recién creada la instancia, debe mostrar el arreglo vacío.
- Llamar al método addProduct y pasarle un producto con todos los campos necesarios.
  El objeto debe agregarse satisfactoriamente con un id generado automaticamente sin repetirse.
- llamar al método getProducts nuevamente, esta vez mostrar el/los productos que hayan sido agregados.
- Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
- Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
- Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
