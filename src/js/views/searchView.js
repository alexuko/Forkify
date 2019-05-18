import { elements } from "../views/base";

export const getInput =  () =>  elements.searchInput.value;


export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
};


/*
   'pasta with tomato and spinach'
   '  5     4     6     3    7   '
acc:0 / acc + cur.length = 5 / newTitle = ['pasta'];
acc:5 / acc + cur.length = 9 / newTitle = ['pasta','with'];
acc:9 / acc + cur.length = 15 / newTitle = ['pasta','with','tomato'];
acc:15 / acc + cur.length = 18 / newTitle = ['pasta','with','tomato'];// no added Its grater than 17
acc:18 / acc + cur.length = 25 / newTitle = ['pasta','with','tomato'];// no added Its grater than 17
 */
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) =>{
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        //return result
        return `${newTitle.join(' ')} ...`;
    }

    return title;
};  

const renderRecipe = recipe =>{

    const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title,20)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>    
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes =>{
    recipes.forEach(renderRecipe);
};