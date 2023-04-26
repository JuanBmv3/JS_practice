
const resultado = document.getElementById('resultado');
const categorias = document.getElementById('categorias');
const modal = new bootstrap.Modal('#modal', {})
const resultFavorites = document.querySelector('.favoritos');



let favorites = [];
document.addEventListener('DOMContentLoaded', () =>{
    favorites = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    if(categorias){
        cargarCategorias();
        categorias.addEventListener('change', seleccionarCategoria)
       
    }

    if(resultFavorites){
        listMeals(favorites);
    }
    
   
    
})

function cargarCategorias(){
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    fetch(url)
        .then( result => result.json())
        .then( data => listarCategorias(data.categories))
}

function listarCategorias(categories = []){
    
    categories.forEach(category =>{
        const { strCategory } = category
      
        const option = document.createElement('option');
        option.value = strCategory;
        option.textContent = strCategory

        categorias.appendChild(option);
    })
    
   
    
}

function seleccionarCategoria(e){
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`;

    Swal.fire({
        title: 'Loading data...',
        html: 'Wait a moment, the results are loading',
        allowOutsideClick : false,
        showConfirmButton : false,
        didOpen: () => {
            Swal.showLoading();
            fetch(url)
            .then(result => result.json())
            .then(data => {
                if(!data.meals){
                    Swal.fire({
                        title: '¡ Error !',
                        text: 'There are no results for this category. ',
                        icon: 'warning'
                    })
                }
                Swal.close(); 
                listMeals(data.meals)
            });

        }
    })
    
}

function listMeals(meals = []){

    limpiarHTML(resultado);

    const title = document.createElement('h2');
    title.classList.add('text-center', 'text-black', 'my-5')
    title.textContent = meals.length ? 'Resultados encontrados' : 'Aún no hay resultados' ;
    resultado.appendChild(title);

    meals.forEach(meal =>{
        const {strMeal, strMealThumb, idMeal } = meal;
        
        const container = document.createElement('div');
        container.classList.add('col-md-4');

        const card = document.createElement('div');
        card.classList.add('card', 'mb-4');

        const image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = strMealThumb ?? meal.img;
        image.alt = `Img meal: ${strMealThumb ?? meal.title}`;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const Heading = document.createElement('h3');
        Heading.classList.add('card-title', 'mb-3');
        Heading.textContent = strMeal ?? meal.title;

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-danger' , 'w-100');
        button.textContent = 'Ver Receta'
        button.onclick = () => selectRecipe(idMeal ?? meal.id);

        cardBody.appendChild(Heading);
        cardBody.appendChild(button);

        card.appendChild(image);
        card.appendChild(cardBody);

        container.appendChild(card);

        resultado.appendChild(container);

    })
}


function selectRecipe(id){
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(result => result.json())
        .then(data => showRecipe(data.meals[0]))
}

function showRecipe(information){
 
    const {idMeal, strMeal, strInstructions, strMealThumb } = information;

    document.querySelector('.modal .modal-title').textContent = strMeal;
    const body = document.querySelector('.modal .modal-body');
    const footer = document.querySelector('.modal .modal-footer');

    body.innerHTML = `
        <img class="img-fluid" src="${strMealThumb}" alt="Imagen : ${strMeal}" />
        <h3 class="my-3"> Instrucciones </h3> 
        <p> ${strInstructions} </p>
    
    `;

    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group');

    for (let i = 1; i <= 20; i++) {
        const ingrediente = information[`strIngredient${i}`]
        const cantidad = information[`strMeasure${i}`] 
        
        if(cantidad && ingrediente){
            const ingredienteLi = document.createElement('li');
            ingredienteLi.classList.add('list-group-item');
            ingredienteLi.innerHTML = `${ingrediente} - ${cantidad}`;
            listGroup.appendChild(ingredienteLi)
        }
    }

    body.appendChild(listGroup);

    const buttonCerrar = document.createElement('button');
    buttonCerrar.classList.add('btn', 'btn-secondary', 'col');
    buttonCerrar.textContent = 'Cerrar';
    buttonCerrar.onclick = () =>{
        modal.hide();
    }

    const buttonFavoritos = document.createElement('button');
    buttonFavoritos.classList.add('btn',  'btn-danger', 'col');
    buttonFavoritos.textContent = existFavorite(idMeal) ? 'Eliminar Favoritos' :'Agregar Favoritos';
    buttonFavoritos.onclick = function(){
        
        
        
        if(existFavorite(idMeal)){
            deleteFavorite(idMeal)
            buttonFavoritos.textContent = 'Agregar Favoritos';
            if(resultFavorites){
                modal.hide();
                listMeals(favorites);
            }
            return;

        }

        const objFav = {
            id: idMeal,
            title: strMeal,
            img: strMealThumb
        }

        addFavorites(objFav)
        favorites = [...favorites, objFav];
        buttonFavoritos.textContent = 'Eliminar Favoritos';
        
    } 

    limpiarHTML(footer);

    footer.appendChild(buttonFavoritos);
    footer.appendChild(buttonCerrar);
    
    modal.show();
}

function addFavorites(recipe){
    localStorage.setItem('favoritos', JSON.stringify([...favorites, recipe]))

}   

function existFavorite(id){
    return favorites.some(favorite => favorite.id === id);
}

function deleteFavorite(id){
    favorites = [...favorites.filter(favorite => favorite.id !== id)];
    localStorage.setItem('favoritos', JSON.stringify(favorites))
}

function cargarFavoritos(){
    limpiarHTML(resultFavorites);

    favorites.forEach(favorite =>{
        const {id, title, img } = favorite;
        
        const container = document.createElement('div');
        container.classList.add('col-md-4');

        const card = document.createElement('div');
        card.classList.add('card', 'mb-4');

        const image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = img;
        image.alt = `Img meal: ${title}`;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const Heading = document.createElement('h3');
        Heading.classList.add('card-title', 'mb-3');
        Heading.textContent = title;

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-danger' , 'w-100');
        button.textContent = 'Ver Receta'
        button.onclick = () => selectRecipe(id);

        cardBody.appendChild(Heading);
        cardBody.appendChild(button);

        card.appendChild(image);
        card.appendChild(cardBody);

        container.appendChild(card);

        resultado.appendChild(container);

    })
}

function limpiarHTML(selector){
    while(selector.firstChild){
        selector.removeChild(selector.firstChild);
    }
}
