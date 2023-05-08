function clientes(){
    return new Promise((resolve, reject) => {
        const error = false;

        setTimeout(() =>{
            if(-error){
                resolve('Listado de clientes');
            }else{
                reject('No se descargo');
            }
        }, 2000);
    })
}

async function ejecutar (){
    try{
        const res =  await clientes();
        console.log(2+2);

    }catch (error){
        console.log(error);

    }
}

ejecutar();