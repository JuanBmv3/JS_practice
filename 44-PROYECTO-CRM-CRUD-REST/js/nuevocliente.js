import { newClient } from "./API.js";
import { verifyInputs } from "./funciones.js";
(function() {

    const form = document.getElementById('formulario');



    form.addEventListener('submit', verifyForm)


    function verifyForm(e){

        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const empresa = document.getElementById('empresa').value;
        
        const client = {
            nombre,
            email,
            telefono,
            empresa
        }
    
        if(!verifyInputs(client)){
            alert('LLena todos los campos')
            return; 
        }

        newClient(client);

    }

})();