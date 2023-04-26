import Cita from './classes/Citas.js';
import UI from './classes/UI.js';

import  {nueva_cita}  from './selectores.js';


let infoCitas = new Cita();
const ui = new UI();

let estadoCitaEditar = false ;

export function verificaCita(e){
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

        ui.listarCitas(infoCitas);   

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

    
        ui.listarCitas(infoCitas);    
    }
}

export function eliminarCita(id){
    infoCitas.eliminarCita(id);
    mostrarAlerta('¡ Success !', 'La cita se ha borrado correctamente', 'success')
    const {citas}  = infoCitas;
    
    ui.listarCitas(citas)
    
}

export function editarCita(cita){
    
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

export function verficaInputs(obj){
    return obj.every( input => input !== '');
}

export function mostrarAlerta(title, text, icon){
    Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false,
        timer: 3000
    })
}