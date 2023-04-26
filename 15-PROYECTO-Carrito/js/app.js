const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){    
    listaCursos.addEventListener('click', elegirCarrito)

    contenedorCarrito.addEventListener('click', seleccionarArticulo)

    vaciarCarritoBtn.addEventListener('click', eliminarCarrrito)

    articulosCarrito = JSON.parse(localStorage.getItem('cursos')) || [] ;

    listarArticulos();
}


function elegirCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const contenido = e.target.parentElement.parentElement;
        guardarArticulo(contenido);
    }
}


function guardarArticulo(contenido){

    const articulo = {
        id:  contenido.querySelector('a').getAttribute('data-id'),
        imagen: contenido.querySelector('img').src,
        nombre: contenido.querySelector('h4').textContent,
        precio: contenido.querySelector('p span').textContent,
        cantidad: 1
    }
    
    if(articulosCarrito.some(curso => curso.id === articulo.id )){
        incrementarCurso = articulosCarrito.map(curso =>{
            if(curso.id === articulo.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        articulosCarrito = [...incrementarCurso];
    }else{
        articulosCarrito = [...articulosCarrito, articulo];
    }

   
    listarArticulos();

}

function listarArticulos(){
    eliminarCarrrito();

    articulosCarrito.forEach(articulo =>{
        const {id, imagen, nombre, precio, cantidad} = articulo;
        const tr = document.createElement('tr');

        const informacion = `
            <td> <img src="${imagen}" width="145%" alt="imagen curso"></td>
            <td> ${nombre}</td>
            <td> ${precio}</td>
            <td> ${cantidad}</td>
            <td><a href=# id="boton-eliminar" class="borrar-curso" data-id="${id}"> X </a></td>
        `;


        tr.innerHTML = informacion;

        contenedorCarrito.appendChild(tr);

        
    })

    guardarLocal();
}

function seleccionarArticulo(e){
    e.preventDefault();
   
    if(e.target.classList.contains('borrar-curso')){
        const id = e.target.getAttribute('data-id');
        borrarArticulo(id);
    }
}

function guardarLocal(){
    localStorage.setItem('cursos', JSON.stringify(articulosCarrito));
}


function borrarArticulo(id){

    if(articulosCarrito.some(articulo => articulo.id === id && articulo.cantidad > 1 )){
        cursos = articulosCarrito.map(articulo =>{
            if(articulo.id === id){
                articulo.cantidad--;
                return articulo;
            }

            return articulo

        })

        articulosCarrito = [...cursos];
        
    }else{
        articulosCarrito = [...articulosCarrito.filter(articulo => articulo.id !== id)];
    }

  

    listarArticulos();
}

function eliminarCarrrito(){
    contenedorCarrito.innerHTML ='';
}
