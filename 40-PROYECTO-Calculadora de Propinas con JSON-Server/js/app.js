let cliente = {

    mesa: '',
    cliente: '',
    pedido: []
}


const buttonOrden = document.getElementById('guardar-cliente');
const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

document.addEventListener('DOMContentLoaded', () => {

    buttonOrden.addEventListener('click', guadarCliente)

})


function guadarCliente(){

    
    const mesa = document.getElementById('mesa').value;
    const hora = document.getElementById('hora').value;


    if(verificaDatos([mesa, hora])){
        Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios',
            icon: 'warning'
        })

        return;
    }

    cliente = {...cliente, mesa, hora};
    const modalFormulario = document.getElementById('formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);

    modalBootstrap.hide();
    
    mostrarSecciones();

    obtenerPlatillos();

}

function mostrarSecciones(){
    const secciones = document.querySelectorAll('.d-none');
 
    secciones.forEach(seccion => seccion.classList.remove('d-none'));
}

function obtenerPlatillos(){
    const url = ' http://localhost:3000/platillos';

    fetch(url)
        .then(res => res.json())
        .then(datos => mostrarPlatillos(datos))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos){
    
    const contenido = document.querySelector('#platillos .contenido');

    platillos.forEach( platillo =>{
        const row = document.createElement('div');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('div');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;


        const precio = document.createElement('div');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement('div');
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement('input');
        inputCantidad.type = "number";
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.classList.add('form-control');

        inputCantidad.onchange = () => {
            const cantidad = parseInt (inputCantidad.value);
            agregarPlatillo({...platillo, cantidad});
        }
        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad)

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);
        

        contenido.appendChild(row)
    })
}

function agregarPlatillo(producto){
    let { pedido } = cliente;
    if(producto.cantidad > 0){
        
        if(pedido.some(articulo => articulo.id === producto.id)){
            cliente.pedido = [...pedido.map(articulo =>{
                if(articulo.id === producto.id){
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            })]
        }else{
            cliente.pedido = [...pedido, producto]
        }
      
    }

    
    if(producto.cantidad < 1){
        cliente.pedido = [...pedido.filter(articulo => articulo.id !== producto.id)]
    }

    actualizarResumen();
    
}

function actualizarResumen(){
    
    const contenido = document.querySelector('#resumen .contenido');
    limpiarHtml(contenido)

    const resumen = document.createElement('div');
    resumen.classList.add('col-md-6');

    const mesa = document.createElement('p');
    mesa.textContent = 'Mesa: ';
    mesa.classList.add('fw-bold');

    const mesaSpan = document.createElement('span');
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal');

    const hora = document.createElement('p');
    hora.textContent = 'Hora: ';
    hora.classList.add('fw-bold');

    const horaSpan = document.createElement('span');
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add('fw-normal');

    mesa.appendChild(mesaSpan);
    hora.appendChild(horaSpan);

    resumen.appendChild(mesa);
    resumen.appendChild(hora);

    const heading = document.createElement('H3');
    heading.textContent = 'Platillos Consumidos';
    heading.classList.add('my-4', 'text-center');

    const grupo = document.createElement('UL');
    grupo.classList.add('list-group')

    const {pedido} =  cliente;

    pedido.forEach(articulo =>{
        const {nombre, cantidad, precio, id} = articulo;

        const lista = document.createElement('li');
        lista.classList.add('list-group-item');

        const nombreEl = document.createElement('h4');
        nombreEl.classList.add('my-4');
        nombreEl.textContent = nombre;

        const cantidadEL = document.createElement('p');
        cantidadEL.classList.add('fw-bold');
        cantidadEL.textContent = 'Cantidad: '

        const cantidadValor = document.createElement('span');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad

        const precioEL = document.createElement('p');
        precioEL.classList.add('fw-bold');
        precioEL.textContent = 'Precio: '

        const precioValor = document.createElement('span');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = precio

        const subTotalEL = document.createElement('p');
        subTotalEL.classList.add('fw-bold');
        subTotalEL.textContent = 'Subtotal: '

        const subTotalValor = document.createElement('span');
        subTotalValor.classList.add('fw-normal');
        subTotalValor.textContent = precio * cantidad


        cantidadEL.appendChild(cantidadValor);
        precioEL.appendChild(precioValor);
        subTotalEL.appendChild(subTotalValor);

        lista.appendChild(nombreEl);
        lista.appendChild(cantidadEL)
        lista.appendChild(precioEL)
        lista.appendChild(subTotalEL)


        grupo.appendChild(lista);
    })

    resumen.appendChild(heading)
    resumen.appendChild(grupo)

    contenido.appendChild(resumen)

    mostrarTotal();
}


function mostrarTotal(){

    const {pedido}  = cliente;


    const contenido = document.querySelector('#resumen .contenido');

    const propina = document.createElement('div');
    propina.classList.add('col-md-6');

    
    const grupo = document.createElement('UL');
    grupo.classList.add('list-group')

    const lista = document.createElement('li');
    lista.classList.add('list-group-item');

    const heading = document.createElement('H3');
    heading.textContent = 'Propinas';
    heading.classList.add('my-4', 'text-center');


    const radio10 = document.createElement('input');
    radio10.type = 'radio';
    radio10.name = 'propina';
    radio10.value = '10';
   
    radio10.classList.add('form-check-input');

    const radio10Label = document.createElement('label');
    radio10Label.textContent = '10%';
    radio10Label.classList.add('form-check-label');

    const radio10Div = document.createElement('div');
    radio10Div.classList.add('form-check');

    

    const radio25 = document.createElement('input');
    radio25.type = 'radio';
    radio25.name = 'propina';
    radio25.value = '20';
    radio25.classList.add('form-check-input');

    const radio25Label = document.createElement('label');
    radio25Label.textContent = '20%';
    radio25Label.classList.add('form-check-label');

    const radio25Div = document.createElement('div');
    radio10Div.classList.add('form-check');

    const radio30 = document.createElement('input');
    radio30.type = 'radio';
    radio30.name = 'propina';
    radio30.value = '30';
    radio30.classList.add('form-check-input');

    const radio30Label = document.createElement('label');
    radio30Label.textContent = '30%';
    radio30Label.classList.add('form-check-label');

    const radio30Div = document.createElement('div');
    radio30Div.classList.add('form-check');

    const cantidadEL = document.createElement('p');
    cantidadEL.classList.add('fw-bold');
    cantidadEL.textContent = 'Subtotal Consumo: '

   


    radio10Div.appendChild(radio10);
    radio10Div.appendChild(radio10Label);

    radio25Div.appendChild(radio25);
    radio25Div.appendChild(radio25Label);

    
    radio30Div.appendChild(radio30);
    radio30Div.appendChild(radio30Label);
  
    lista.appendChild(heading)
    lista.appendChild(radio10Div);
    lista.appendChild(radio25Div);
    lista.appendChild(radio30Div);

    const SubtTotalEL = document.createElement('p');
    SubtTotalEL.classList.add('fw-bold');
    SubtTotalEL.textContent = 'SubTotal Consumo: '
   
   

    const SubTotalValor = document.createElement('span');
    SubTotalValor.classList.add('fw-normal');
    SubTotalValor.textContent = '';
   
    SubTotalValor.appendChild(SubTotalValor);
    lista.appendChild(SubTotalValor);

    const propinaEL = document.createElement('p');
    propinaEL.classList.add('fw-bold');
    propinaEL.textContent = 'Propina: '
    
    const propinaValor = document.createElement('span');
    propinaValor.classList.add('fw-normal');
    propinaValor.textContent = 

    lista.appendChild(propinaValor);
    lista.appendChild(propinaValor);


    radio10.onchange = () => { 
        let subtotal;
      
        pedido.forEach(info =>{
            subtotal += info.cantidad * info.precio;
        }) 
       

        Math.floor((subtotal * 10) / 100) 
     
    
    }

    grupo.appendChild(lista);

    propina.appendChild(grupo)
    contenido.appendChild(propina)

}


function limpiarHtml(selector){
    while(selector.firstChild){
        selector.removeChild(selector.firstChild);
    }
}

function verificaDatos(inputs){
    return inputs.some(input => input === '');
}
