const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista-tweets');

let tweets = [];

eventListeners();

function eventListeners(){

    formulario.addEventListener('submit', guardarTweet)

    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    listarTweets();
    
    

}

function guardarTweet(e){
    e.preventDefault();

    const mensaje = document.getElementById('tweet').value;

    if(mensaje === ''){
        mostrarAlerta('Debes de ingresar un mensaje antes de agregar');
        return;
    }

    const objTweet ={
        id: Date.now(),
        tweet: mensaje
    };

    tweets = [...tweets, objTweet];

    listarTweets();
    formulario.reset();

}


function listarTweets(){
    lista.innerHTML = '';

    if(tweets.length > 0){
        tweets.forEach(twt =>{
            const {id, tweet} = twt;
            
            const button = document.createElement('a');
            button.textContent = 'X';
            button.classList.add('borrar-tweet');
            
            button.onclick = function(e){
                e.preventDefault();
                borrarTweet(id);
            }
           

            const li = document.createElement('li');
           
            li.textContent = tweet;


            li.appendChild(button);
            lista.appendChild(li);
        });
    
        
    }

    sincronizarTweets();
}

function sincronizarTweets(){

    localStorage.setItem('tweets', JSON.stringify(tweets));
    
}

function borrarTweet(id){
    tweets = [...tweets.filter(tweet => tweet.id !== id)];
    listarTweets();
}

function mostrarAlerta(mensaje){   
    const alerta = document.querySelector('.alerta');


    if(!alerta){
        const div = document.createElement('p');
        
        div.classList.add('error', 'alerta');
        div.textContent = mensaje;

        const contenido = document.getElementById('contenido')
        contenido.appendChild(div);

        setTimeout( () =>{
            div.remove();
        }, 3000)
    }
}