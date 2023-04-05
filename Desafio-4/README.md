#                                                              CURSO BACKEND CODERHOUSE
# PRIMERA ENTREGA DEL PROYECTO FINAL

## CONSIGNA

- Se desarrollará un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra  en el e-commerce.

### ASPECTOS A INCLUIR

Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
- La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior).
- La ruta GET /:pid deberá traer sólo el producto con el id proporcionado.
- La ruta raíz POST / deberá agregar un nuevo producto al archivo de productos. Todos los campos son obligatorios.
- La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
- La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:
- La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
    * Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
    * products: Array que contendrá objetos que representen cada producto.
- La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
- La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
    * product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo).
    * quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno. Si un producto ya existente intenta agregarse al producto, solo se debe incrementar el campo quantity de dicho producto.

La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.
