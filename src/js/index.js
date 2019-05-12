import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';
/** the global state of the app
 * -search object
 * current recipe object
 * shopping list
 * linked recipes
 */
// const input = document.querySelector('.search__field');

// document.querySelector('.search').addEventListener('click', () => {
//     alert(input.value);
// })

const state ={} 

const controlSearch = async () => {
    //get query from view
    const query = searchView.getInput(); // TODO
    console.log(query);
    if (query){
        //2-New search object and add it to state
        state.search = new Search(query);

        //3-prepare UI for results

        //4- swarch for recipes
         await state.search.getResults();

        //5- render results in UI
        console.log(state.search.result)
    }
}

elements.searchForm.addEventListener('submit',e =>{
    e.preventDefault();
    controlSearch();
})




