import { getClients, deleteClient } from "./API.js"

const list_client = document.getElementById('listado-clientes');

document.addEventListener('DOMContentLoaded', async () =>{

    const clients = await getClients();

    listClients(clients);


    list_client.addEventListener('click', selectClient)


    

})

function listClients(clients){

    clients.forEach(client => {
        let row = document.createElement('tr');

        const {nombre, email, telefono, empresa, id} = client;

        row.innerHTML += `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `;

        list_client.appendChild(row);
    });


}


function selectClient(e){
    if(e.target.classList.contains('eliminar')){
        const idClient = e.target.dataset.cliente;

        deleteClient(idClient);
    }
}