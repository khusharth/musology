import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
import '../scss/main.scss';

// Global State
// -> Search object
// -> Current music Object
// -> lyrics object
// -> Liked music
const state = {};
window.state = state;

// ------ SEARCH CONTROLLER ------ //
const controlSearch = async () => {
    // 1) Get search query from search input
    const query = searchView.getInput();

    // 2) Create new Search obj and add it to state
    state.search = new Search(query);

    // 3) Create UI for search result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4) Search for recipies
    try {
        await state.search.getResults();
        clearLoader();

        // 5) Render results on UI
        searchView.renderResults(state.search.result);

    } catch (error) {
        alert('Error With getting Music Result');
        clearLoader();
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
