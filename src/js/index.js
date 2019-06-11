import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';
import Recipe from './models/Recipe';

/** the global state of the app
 * -search object
 * current recipe object
 * shopping list
 * linked recipes
 */

const state = {}


/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput(); 
    // const query = 'pizza'; 
    // console.log(query);
    if (query) {
        //2-New search object and add it to state
        state.search = new Search(query);

        //3-prepare UI for results
        //clear fields
        searchView.clearInput();
        searchView.clearResults();
        //spinner
        renderLoader(elements.searchResults);

        try {
            //4- search for recipes
            await state.search.getResults();

            //5- render results in UI
            clearLoader();
            searchView.renderResults(state.search.result);
            // console.log(state.search.result);

        } catch (error) {
            alert('Something went wrong with the Search :(');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//TESTING
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// })

elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    // console.log(e.target);
    // console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults(); // first clear previous results 
        searchView.renderResults(state.search.result, goToPage); // render next or prev page results
        // console.log(goToPage);
    }

});

/**
 * RECIPE CONTROLLER
 */
// const r = new Recipe(47746);
// r.getRecipe();
// console.log(r);
const controlRecipe = async () => {
    // get id from the URL
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        // 1.- Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight selected search 
        searchView.highlighSelected(id);

        // 2.- Create new recipe object 
        state.recipe = new Recipe(id);
        
        //Testing
        // window.r = state.recipe;

        try {
            // 3.- Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
            // 4.- Calculate Servings and time
            state.recipe.calCookingTime();
            state.recipe.calcServings();

            // 5.- Render Recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            //console.log(state.recipe);

        } catch (error) {
            alert('error processing recipe :(');
        }
    }

}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //Decreased btn is 
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        //Increase btn is clicked
            state.recipe.updateServings('inc');
            recipeView.updateServingIngredients(state.recipe);
    }
    console.log(state.recipe);
});