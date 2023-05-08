const url = 'http://localhost:3000/clientes';

export const getClients = async () =>{
    
    const result = await fetch(url);
    const data = await result.json();
    return data;

}

export const getClient = async id =>{
    try {
        const result = await fetch(`${url}/${id}`);
        const data = await result.json();
        return data;

    } catch (error) {
        
    }
}

export const newClient = async client =>{

    try {
        fetch( url,{
            method: 'POST',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        window.location.href = 'index.html';

        
    } catch (error) {
        console.log(error);
    }
    
}

export const updateClient = async (id,client) =>{

    try {
        fetch( `${url}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        window.location.href = 'index.html';

        
    } catch (error) {
        console.log(error);
    }
    
}

export const deleteClient = async id =>{

    try {
        fetch( `${url}/${id}`,{
            method: 'DELETE'
        })
        
    } catch (error) {
        console.log(error);
    }
    
}