import Search from './models/Search';
import Music from './models/Music';
import Lyrics from './models/Lyrics';
import * as searchView from './views/searchView';
import * as musicView from './views/musicView';
import * as lyricsView from './views/lyricsView';
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

    if (query) {
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
    }
};

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlSearch();
});

elements.pagination.addEventListener('click', (e) => {
    // Closest finds the closest element which has pagination__btn class
    const btn = e.target.closest('.pagination__btn');
    if (btn) {
        // dataset.goto to access data-goto attribute
        const goToPage = parseInt(btn.dataset.goto, 10);
        // Clear previous buttons before calling new
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// Music Controller
const controlMusic = async () => {
    // 1) Get the id
    const id = window.location.hash.replace('#', '');

    if (id) {
        // 2) Render Loader
        musicView.clearMusic();
        lyricsView.clearLyrics();
        renderLoader(elements.music);
        renderLoader(elements.lyricsCard);

        // 3) Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }
        // 4) Create New music object and add it to state
        state.music = new Music(id);

        // 5) Get the music data
        try {
            await state.music.getMusic();
            musicView.clearMusic();
            clearLoader();
            // 6) Render Music Data
            musicView.renderMusic(state.music.data);
        } catch (error) {
            alert(error);
            clearLoader();
        }

        state.lyrics = new Lyrics(
            state.music.data.artist.name,
            state.music.data.title_short
        );

        try {
            await state.lyrics.getLyrics();
            lyricsView.clearLyrics();
            clearLoader();

            lyricsView.renderLyrics(state.lyrics.data);
        } catch (error) {
            alert(error);
            clearLoader();
        }
    }
};

window.addEventListener('hashchange', controlMusic);
