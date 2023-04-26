const lista_cursos = document.getElementById('lista-cursos');
const lista_carrito = document.getElementById('lista-carrito');
const info_carrito = document.getElementById('info-carrito')
const bntVaciarCarrito = document.getElementById('vaciar-carrito');
let cursos = [];
document.addEventListener('DOMContentLoaded', () => {
    cursos = JSON.parse(localStorage.getItem('cursos')) || [] ;

    listarCurso();

    lista_cursos.addEventListener('click', elegirCurso)

    bntVaciarCarrito.addEventListener('click', ()=>{
        cursos = [];
        limpiarCarrito();
    });


    lista_carrito.addEventListener('click', borrarCurso)



})

function elegirCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        guardarCurso(e.target.parentElement.parentElement);
    }
}

function guardarCurso(informacion){
    const curso = {
        imagen: informacion.querySelector('img').src,
        nombre: informacion.querySelector('h4').textContent,
        precio: informacion.querySelector('.precio span').textContent,
        cantidad : 1,
        id: informacion.querySelector('a').getAttribute('data-id'),
    }

    if(cursos.some( info => info.id === curso.id)){
        cursos = [...cursos.map( info => {
            if(info.id === curso.id){
                info.cantidad++;
                return info;
            }
            return info;
        })];
    }else{
        cursos = [...cursos, curso];
    }

   

    listarCurso();
}

function listarCurso(){
    limpiarCarrito();
    cursos.forEach( curso =>{
        const {imagen, id, nombre, cantidad, precio } = curso;

        const tr = document.createElement('tr');

        const info = `
            <td><img src="${imagen}" width="95px" alt="imagen curso"></td>
            <td> ${nombre} </td>
            <td> ${precio} </td>
            <td> ${cantidad}</td>
            <td><a href="#" id="boton-eliminar" class="borrar-curso" data-id="${id}"> X </a></td>

        `;

        tr.innerHTML = info;

        info_carrito.appendChild(tr);
    })

    guardarLocal();
}

function borrarCurso (e){
    e.preventDefault()


    if(e.target.classList.contains('borrar-curso')){
        const id = e.target.getAttribute('data-id');
        
        if(cursos.some(info => info.id === id && info.cantidad > 1)){
            cursos = [...cursos.map(info =>{
                if(info.id === id ){
                    info.cantidad--;
                    return info;
                }

                return info;
            })
            ]
        }else{
            cursos = [...cursos.filter(info => info.id !== id)]
        }
    }

    listarCurso();
}


function guardarLocal(){
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function limpiarCarrito(){
    info_carrito.innerHTML = '';
}