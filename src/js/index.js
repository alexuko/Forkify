import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

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
        searchView.clearInput();
        searchView.clearResults();

        //4- search for recipes
         await state.search.getResults();

        //5- render results in UI
        searchView.renderResults(state.search.result);
        // console.log(state.search.result);
    }
}

elements.searchForm.addEventListener('submit',e =>{
    e.preventDefault();
    controlSearch();
})




