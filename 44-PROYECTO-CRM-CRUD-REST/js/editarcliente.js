import { getClient,updateClient } from "./API.js";
import { verifyInputs } from "./funciones.js";
(function (){

    const nombreI = document.getElementById('nombre');
    const emailI = document.getElementById('email');
    const telefonoI = document.getElementById('telefono');
    const empresaI = document.getElementById('empresa');
    const form = document.getElementById('formulario');

    const url = new URLSearchParams(window.location.search);

    const idClient = parseInt(url.get('id'));


    document.addEventListener('DOMContentLoaded', () =>{

        
        showInformation(idClient);

        form.addEventListener('submit', sendInformation)


        
    })


    async function showInformation(id){
        const client = await getClient(id);

        const {nombre, email, telefono, empresa} = client;

        nombreI.value = nombre;
        emailI.value = email;
        telefonoI.value = telefono;
        empresaI.value = empresa;
    }


    function sendInformation(e){
        e.preventDefault();

        const client = {
            nombre: nombreI.value,
            email: emailI.value,
            telefono: telefonoI.value,
            empresa: empresaI.value
        }

        if(!verifyInputs(client)){
            alert('No dejes campos vacios');
            return 
        }

        updateClient(idClient, client)


    }


})();