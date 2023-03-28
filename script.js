
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let main = document.querySelector ('.cajaprincipal');
let cart = document.querySelector('.carrito-items');
let totalCompra = document.querySelector('.carrito-total');

mostrarCarrito();

function cargarProductos(){
productos.forEach((prod) => {
    let {nombre, img, precio, id} = prod; 
    main.innerHTML += `<div class="card">
                              <span class="titulo-item">${nombre}<span>
                              <div class="img-box">
                              <img src="${img}"></img>
                              </div>
                              <span> $ ${precio}</span>
                              <button id="book-${id}">Agregar</button>
                          </div>`;
  });
  usarBotones ();
}
function usarBotones () {
    productos.forEach(prod=>{
       document.getElementById(`book-${prod.id}`).addEventListener
       ('click', () => {
        agregarAlCarrito (prod);
       })
    });
}
function agregarAlCarrito(prod){
    let existe = carrito.some (element => element.id == prod.id)

    if( !existe ){
        prod.cantidad = 1 ;
        carrito.push(prod);
    }else {
        let miProd = carrito.find ((element) => element.id == prod.id);
        miProd.cantidad++;
        console.log (carrito);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();    
}
function mostrarCarrito() {
    carrito.length === 0 
     ? cart.innerHTML = '<div><h3 class="carritoVacio">TU CARRITO <h3></div> <div><h3 class="carritoVacio">  ESTA VACIO <h3></div>' 
     : cart.innerHTML = '';
    carrito.forEach ((prod) => {
        let {nombre, cantidad, precio, id} = prod;
        cart.innerHTML += `<div class="card">
                            <span> ${nombre}<span>                            
                            <p>CANTIDAD: ${cantidad}</p>
                            <p>PRECIO UNITARIO: $ ${precio} </p>
                            <p>SUBTOTAL: $ ${precio*cantidad}</p>
                            <div class= "selector-cantidad">
                            <button id="borrar-${id}">Borrar</button>
                            </div>`;
    });
    mostrarTotal();
    usarBotonesCarrito();
}
function usarBotonesCarrito() {
    carrito.forEach(prod=>{
        document.getElementById(`borrar-${prod.id}`).addEventListener
        ('click', () => {
         sacarDelCarrito (prod);
        })
     });
}
function sacarDelCarrito (prod){
    let foundId = carrito.find ((element) => element.id == prod.id);
    carrito = carrito.filter ((carritoId) => {
        return carritoId !== foundId;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito ();
    mostrarTotal();
}
function mostrarTotal(){
    let total = carrito.reduce((acc,ite)=> acc+ite.precio * ite.cantidad, 0);
    totalCompra.innerHTML = '';
    totalCompra.innerHTML += `<div class="total">
                             <span>EL TOTAL DE TU COMPRA ES $ ${total}<span>                            
                             </div>`;
}
cargarProductos();