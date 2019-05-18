import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderTheLoader, clearLoader} from './views/base';

/** the global state of the app
 * -search object
 * current recipe object
 * shopping list
 * linked recipes
 */

const state ={} 

const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput(); // TODO
    // console.log(query);
    if (query){
        //2-New search object and add it to state
        state.search = new Search(query);

        //3-prepare UI for results
            //clear fields
        searchView.clearInput();
        searchView.clearResults();
            //spinner
        renderTheLoader(elements.searchResults);            

        //4- search for recipes
         await state.search.getResults();

        //5- render results in UI
        clearLoader();
        searchView.renderResults(state.search.result);
        // console.log(state.search.result);
    }
}

elements.searchForm.addEventListener('submit',e =>{
    e.preventDefault();
    controlSearch();
})

elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    // console.log(e.target);
    // console.log(btn);
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults(); // first clear previous results 
        searchView.renderResults(state.search.result, goToPage);// render next or prev page results
        // console.log(goToPage);
    }
    
});


