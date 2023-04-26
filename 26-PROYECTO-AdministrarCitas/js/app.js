const lista_citas = document.getElementById('citas');

class Cita {
    constructor(){
        this.citas = [];
    }

    guardarCita(cita){
        this.citas = [...this.citas, cita]
    }

    eliminarCita(id){
        this.citas = [...this.citas.filter( cita => cita.id !== id)];
    }

    acualizarCita(citaNueva){
        this.citas = [...this.citas.map( cita => cita.id === citaNueva.id ? citaNueva : cita)]

        console.log(this.citas)
    }
  
}



class UI{
    listarCitas({citas}){

        lista_citas.innerHTML = '';

        citas.forEach( cita =>{

            const {nombre, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = nombre;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar X';
            btnEliminar.onclick = () => eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-warning', 'mr-2');
            btnEditar.innerHTML = 'Editar X';
            btnEditar.onclick = () => editarCita(cita);

           
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            lista_citas.appendChild(divCita);

        })
    }
}


const nueva_cita = document.getElementById('nueva-cita')
let infoCitas = new Cita();
const interface = new UI();
let estadoCitaEditar = false ;
let objCitaEditada;


eventListeners();

function eventListeners (){

    nueva_cita.addEventListener('submit', verificaCita);
}




function verificaCita(e){
    e.preventDefault();

        const nombre = document.getElementById('mascota').value;
        const propietario = document.getElementById('propietario').value;
        const telefono = document.getElementById('telefono').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const sintomas = document.getElementById('sintomas').value;

        if(!verficaInputs([nombre, propietario, telefono, fecha, hora, sintomas])){
            mostrarAlerta('¡ Error ! ', ' Todos los campos son obligatorios ', 'warning');
            return;
        }

    if(estadoCitaEditar){
        
        const btn = nueva_cita.querySelector('button[type="submit"]')
        
        const id = btn.dataset.id
        
        const infoEditada = {
            nombre,
            propietario,
            telefono,
            fecha,
            hora,
            sintomas,
            id
        }

        infoCitas.acualizarCita(infoEditada);

        mostrarAlerta('¡ Success !', 'La cita se ha actualizado correctamente', 'success')
        btn.textContent = 'Crear cita';
        delete btn.dataset.id;

        nueva_cita.reset();

        interface.listarCitas(infoCitas);   

        estadoCitaEditar = false;

        return;

        
    } else{

        const info = {
            nombre,
            propietario,
            telefono,
            fecha,
            hora,
            sintomas,
            id: Date.now().toString()
        }
        

        infoCitas.guardarCita(info);
        mostrarAlerta('¡ Success !', 'La cita se ha agregado correctamente', 'success')
        nueva_cita.reset();

    
        interface.listarCitas(infoCitas);    
    }
}

function eliminarCita(id){
    infoCitas.eliminarCita(id);
    mostrarAlerta('¡ Success !', 'La cita se ha borrado correctamente', 'success')
    const {citas}  = infoCitas;
    
    interface.listarCitas(citas)
    
}

function editarCita(cita){
    
    const {nombre, propietario, telefono, fecha, hora, sintomas, id } = cita;


    document.getElementById('mascota').value = nombre
    document.getElementById('propietario').value = propietario
    document.getElementById('telefono').value = telefono
    document.getElementById('fecha').value = fecha
    document.getElementById('hora').value = hora
    document.getElementById('sintomas').value = sintomas

    nueva_cita.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    nueva_cita.querySelector('button[type="submit"]').dataset.id = id

    estadoCitaEditar = true;




}

function verficaInputs(obj){
    return obj.every( input => input !== '');
}

function mostrarAlerta(title, text, icon){
    Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false,
        timer: 3000
    })
}



