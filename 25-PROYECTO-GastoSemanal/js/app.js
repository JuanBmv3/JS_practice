const formulario = document.getElementById('agregar-gasto');
const listado_gastos = document.getElementById('gastos');
const btnAddFondo = document.getElementById('btnAddFondos');
let objAlertas;

eventListeners();
function eventListeners(){

    document.addEventListener('DOMContentLoaded',  preguntarPresupuesto)
    formulario.addEventListener('submit', agregarGasto);
    listado_gastos.addEventListener('click', borrarGasto);
    btnAddFondo.addEventListener('click', ActualizarPresupuesto)


}


class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = presupuesto;
        this.restante = presupuesto;
        this.gastos = [];
    }

    guardarGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.actualizarRestante();
    }
    actualizarRestante(){
        const gastado = this.gastos.reduce( (total, gasto) =>  total + gasto.cantidad , 0 )
        this.restante = this.presupuesto - gastado;
    }

    eliminaGasto(id){
        this.gastos = [...this.gastos.filter(gasto => gasto.id !== id )];
        this.actualizarRestante();
    }

    actualizarFondos(fondo){
        this.presupuesto += fondo;
        this.restante += fondo;
    }
}

class UI{
    mostrarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad
        document.getElementById('total').textContent = presupuesto;
        document.getElementById('restante').textContent = restante;
    }

    muestraGastos(gastos){
        listado_gastos.innerHTML = '';
        gastos.forEach( gasto => {
            const { nombre, cantidad , id} = gasto;

            const li = document.createElement('li');

            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.dataset.id = id;

            li.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $${cantidad} </span>`;

            const button = document.createElement('button');

            button.classList.add('btn','btn-danger', 'borrar-gasto');
            button.textContent = 'Borrar';
        
            li.appendChild(button);
            listado_gastos.appendChild(li);
        })
    }

    muestraRestante(restante){
        const textRestante = document.getElementById('restante');
        const presupuesto = Number(document.getElementById('total').textContent);
        
        
        if(restante <= presupuesto/2){
            textRestante.parentElement.parentElement.classList.remove('alert-success');
            textRestante.parentElement.parentElement.classList.remove('alert-danger');
            textRestante.parentElement.parentElement.classList.add('alert-warning');
        }
        if(restante <= presupuesto/3){
            textRestante.parentElement.parentElement.classList.remove('alert-success');
            textRestante.parentElement.parentElement.classList.remove('alert-warning');
            textRestante.parentElement.parentElement.classList.add('alert-danger');
        }
        if(restante > presupuesto/2){
            textRestante.parentElement.parentElement.classList.remove('alert-danger');
            textRestante.parentElement.parentElement.classList.remove('alert-warning');
            textRestante.parentElement.parentElement.classList.add('alert-success');
        }

        textRestante.textContent = restante;
    }
}

const interface = new UI
let presupuesto;


function preguntarPresupuesto(){
    Swal.fire({
        title: 'Ingresa tu presupuesto inicial',
        input: 'text',
        inputLabel: 'Presupuesto Inicial',
        showCancelButton: false,
        allowOutsideClick: false,
        inputValidator: (value) => {

            if (!value) {
                return 'No puedes dejar en blanco tu presupuesto inicial';
            }

            value = Number(value);

            if(value === null || isNaN(value) || value <= 0 ){
                return 'El presupuesto ingresado no es un número, intenta de nuevo';
            }
            
           
            presupuesto = new Presupuesto(value);
            
            interface.mostrarPresupuesto(presupuesto);
              
          
        }
      })
}

function agregarGasto(e){
    e.preventDefault();
    const nombre = document.getElementById('gasto').value;
    let cantidad = document.getElementById('cantidad').value;

   
    if(!verificaDatos([nombre,cantidad])){
        objAlertas = {
            title: '¡ Error !',
            text: 'Todos los campos son obligatorios',
            icon: 'warning'
        }
        mostrarAlerta();
        return;
    }

    cantidad = Number(cantidad);

    if(isNaN(cantidad) || cantidad <= 0 ){
        objAlertas = {
            title: '¡ Error !',
            text: 'La cantidad ingresada no es un número',
            icon: 'warning'
        }
        mostrarAlerta();
        return;
    }

    
    
    if(cantidad > presupuesto.presupuesto || cantidad > presupuesto.restante){
        objAlertas = {
            title: '¡ Error !',
            text: 'La cantidad ingresada es mayor al del presupuesto o no tienes demasidos fondos restantes',
            icon: 'warning'
        }
        mostrarAlerta();
        return;
    }

    const gasto ={
        nombre,
        cantidad,
        id: Date.now().toString()
    }

    presupuesto.guardarGasto(gasto);
    objAlertas = {
        title: 'Success',
        text: 'Gasto ingresado satisfactoriamente',
        icon: 'success'
    }
    mostrarAlerta(objAlertas);
    formulario.reset()

    const {gastos, restante} = presupuesto;

    interface.muestraGastos(gastos);

    interface.muestraRestante(restante);

}

function ActualizarPresupuesto(){
    Swal.fire({
        title: 'Añade fondos',
        input: 'text',
        inputLabel: 'Cantidad del fondo a agregar',
        showCancelButton: true,
        allowOutsideClick: false,
        inputValidator: (value) => {

            if (!value) {
                return 'No puedes dejar en blanco tu presupuesto inicial';
            }

            value = Number(value);

            if(value === null || isNaN(value) || value <= 0 ){
                return 'El presupuesto ingresado no es un número, intenta de nuevo';
            }
            
            
            presupuesto.actualizarFondos(value);

            interface.mostrarPresupuesto(presupuesto);


              
          
        }
      })
}

function verificaDatos(inputs){
    return inputs.every(input => input !== '');
}

function mostrarAlerta(){
    const {title, text, icon} = objAlertas;
    
    Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false,
        timer: 3000
    })
   
    
}

function borrarGasto(e){
    if(e.target.classList.contains('borrar-gasto')){
        const id = e.target.parentNode.dataset.id;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                
                presupuesto.eliminaGasto(id);
        
                const { gastos, restante } = presupuesto;
        
                interface.muestraGastos(gastos);
                interface.muestraRestante(restante);
                
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
       
    }
}


