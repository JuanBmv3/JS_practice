const marca = document.getElementById('marca');
const year = document.getElementById('year');
const minimo = document.getElementById('minimo');
const maximo = document.getElementById('maximo');
const puertas = document.getElementById('puertas');
const transmision = document.getElementById('transmision');
const color = document.getElementById('color');

const resultado = document.querySelector('#resultado');

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}


document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);
    mostrarYears();

    marca.addEventListener('change', e =>{
        datosBusqueda.marca = e.target.value;
        filtrarAuto();
    });
    year.addEventListener('change', e =>{
        datosBusqueda.year = e.target.value;
        filtrarAuto();
    });
    minimo.addEventListener('change', e =>{
        datosBusqueda.minimo = e.target.value;
        filtrarAuto();
    });
    maximo.addEventListener('change', e =>{
        datosBusqueda.maximo = e.target.value;
        filtrarAuto();
    });
    puertas.addEventListener('change', e =>{
        datosBusqueda.puertas = e.target.value;
        filtrarAuto();
    });
    transmision.addEventListener('change', e =>{
        datosBusqueda.transmision = e.target.value;
        filtrarAuto();
    });
    color.addEventListener('change', e =>{
        datosBusqueda.color = e.target.value;
        filtrarAuto();
    });




function mostrarAutos(autos){
    resultado.innerHTML = '';

    autos.forEach(auto => {
        const {marca,modelo,year,precio,puertas,color,transmision} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio ${precio} - Color: ${color}
        `;

        resultado.appendChild(autoHTML);
    });
}

function noResultados(){
    resultado.innerHTML = '';
    const noResultados = document.createElement('div');
    noResultados.classList.add('alerta', 'error');
    noResultados.textContent = 'No hay autos con esos parametos.'

    resultado.appendChild(noResultados);
    
}


function mostrarYears(){
    const yearNow = new Date().getFullYear();
   
    for (let yearHTML = 2015; yearHTML <= yearNow; yearHTML++) {
        const option = document.createElement('option');

        option.value= yearHTML;
        option.textContent = yearHTML;
        year.appendChild(option);
    }
}

function filtrarAuto(){
   const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMin).filter(filtrarMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
   
   if(!resultado.length){
        noResultados();
   }else{
        mostrarAutos(resultado);
   }

   
   
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;

    if(marca){
        return auto.marca === marca;
    }
    return auto;
}


function filtrarYear(auto){
    const {year} = datosBusqueda;

    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMin(auto){
    const {minimo} = datosBusqueda;

    if(minimo){
        return auto.minimo === parseInt(minimo);
    }
    return auto;
}


function filtrarMax(auto){
    const {maximo} = datosBusqueda;

    if(maximo){
        return auto.maximo = parseInt(maximo);
    }
    return auto;
}


function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;

    if(puertas){
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;

    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;

    if(color){
        return auto.color === color;
    }
    return auto;
}



})