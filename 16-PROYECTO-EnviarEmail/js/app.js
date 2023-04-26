document.addEventListener('DOMContentLoaded',() =>{
    
    let mensajeEmail = {
        email : '',
        asunto : '',
        mensaje : ''
    }

    const inputEmail = document.getElementById('email');
    const inputAsunto = document.getElementById('asunto');
    const inputMensaje = document.getElementById('mensaje');
    const ccEmail = document.getElementById('ccEmail').value;
    const formulario = document.getElementById('formulario');
    const btnForm = document.getElementById('btnForm');
    const btnReset = document.getElementById('btnReset');
    const spinner = document.querySelector('.spinner');

    inputEmail.addEventListener('blur', verificarInput)
    inputAsunto.addEventListener('blur', verificarInput)
    inputMensaje.addEventListener('blur', verificarInput)

    btnReset.addEventListener('click', limpiarFormulario);
    btnForm.addEventListener('click', enviarEmail);
       




function verificarInput(e){

   

    if(e.target.value === '' && e.target.name !== 'ccEmail'){
        mensajeEmail[e.target.name] = '' 
        comprobarEmail();
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement , e.target.id, 'error');
        return;
        

        
    }
    
    removerAlerta(e.target.id);

    mensajeEmail[e.target.name] = e.target.value.trim();

    comprobarEmail();
}


function mostrarAlerta(mensaje, div, id, tipo){
  
    if(tipo === 'error'){
        const alert = document.querySelector('.error-'+id+'');
        if(alert){
            alert.remove();
        }
        
        
        const error = document.createElement('p')
        error.textContent = mensaje;
        error.classList.add('bg-red-600' , 'text-white', 'p-2', 'text-center', 'error-'+id+'');
        div.appendChild(error);
        return;
    }

    if(tipo === 'success'){
        const alert = document.querySelector('.email-enviado');
        if(alert){
            alert.remove();
        }
        
        
        const alertSuccess = document.createElement('p')
        alertSuccess.textContent = mensaje;
        alertSuccess.classList.add('bg-green-500' , 'text-white', 'p-2', 'text-center', 'email-enviado', 'uppercase', 'font-bold');
        div.appendChild(alertSuccess);
        return;
    }

    
   
}

function removerAlerta(id){
    const alert = document.querySelector('.error-'+id+'')
    if(alert){
        alert.remove()
        return;
    }
   
    return;
    
}

function comprobarEmail(){
    
   if(Object.values(mensajeEmail).includes('')){
        btnForm.classList.add('opacity-50');
        btnForm.disabled = true;
   }else{
        mensajeEmail.cc = ccEmail;
        btnForm.classList.remove('opacity-50');
        btnForm.disabled = false;
   }
}

function limpiarFormulario(){
    formulario.reset();
    btnForm.classList.add('opacity-50');
    btnForm.disabled = true;

    mensajeEmail = {
        email : '',
        asunto : '',
        mensaje : ''
    }
    
}

function enviarEmail(e){
    console.log(mensajeEmail)
    e.preventDefault();
    spinner.classList.remove('hidden')

    

    setTimeout( ()=>{
        spinner.classList.add('hidden');
        mostrarAlerta('El correo se ha enviado satisfactoriamente !', formulario, '','success')
        limpiarFormulario();

        mensajeEmail = {
            email : '',
            asunto : '',
            mensaje : ''
        }

    }, 3000);

    
  
}





});