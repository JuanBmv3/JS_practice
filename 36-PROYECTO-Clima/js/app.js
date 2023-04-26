const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', verificarInputs)

})
    

function verificarInputs(e){
    e.preventDefault();
    
    const ciudad = document.getElementById('ciudad').value
    const pais = document.getElementById('pais').value


    if(ciudad === "" || pais === "" ){
        Swal.fire({
            title: '¡ Error !',
            text: 'No debes de dejar campos vacios o sin seleccionar',
            icon: 'warning'
        })

        return;
    }

    consultarAPI(ciudad, pais);

}

function consultarAPI(ciudad, pais){
    
    const key = '6965d22c194f206953d89660448d1cb6';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;

    Swal.fire({
        title: 'Cargando datos...',
        html: 'Espere un momento ya que los datos están siendo procesados',
        allowOutsideClick : false,
        showConfirmButton : false,
        didOpen: () => {
            Swal.showLoading();
            fetch(url)
                .then(respuesta => respuesta.json())
                .then( datos => {
                    if(datos.cod === "404"){
                        Swal.fire({
                            title: '¡ Error !',
                            text: 'No existe la ciudad ingresada',
                            icon: 'warning'
                        })
                
                        return;
                    } 
                    Swal.close(); 
                    mostrarClima(datos);
                })
        }
    })


    
}

function mostrarClima(datos){
    resultado.innerHTML = '';

    const { main: {temp , temp_min, temp_max}, name } = datos;

    const centigrados = temp - 273.15;
    const max = temp_min - 273.15;
    const min = temp_max - 273.15;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');


    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${Math.round(centigrados)} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

  
    
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${Math.round(max)} &#8451`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${Math.round(min)} &#8451`;
    tempMinima.classList.add('text-xl');



    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);

}