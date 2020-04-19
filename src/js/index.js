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

// For mobile view show search results
elements.searchBtn.addEventListener('click', () => {
    const isShown = elements.searchRes.classList.contains('transform');

    if (!isShown) {
        console.log('trans');
        elements.searchRes.classList.add('transform');
    } else {
        console.log('Already has transform');
    }

});

// For mobile view hide search results
elements.searchRes.addEventListener('click', (event) => {
    const resultList = event.target.closest('.results__link');

    if (resultList) {
        const isShown = elements.searchRes.classList.contains('transform');

        if (isShown) {
            console.log('trans removed');
            elements.searchRes.classList.remove('transform');
        } else {
            console.log("transform not Present")
        }
    }
});


// ------ MUSIC CONTROLLER ------ //
const controlMusic = async () => {
    // 1) Get the id
    const id = window.location.hash.replace('#', '');

    if (id) {
        // 2) Render Loader
        musicView.clearMusic();
        lyricsView.clearLyrics();
        renderLoader(elements.music);
        renderLoader(elements.lyricsCard);

        // 3) Highlight selected search item and pause current song if any
        if (state.search) {
            searchView.highlightSelected(id);
            musicView.pauseSong();
        }
        // 4) Create New music object and add it to state
        state.music = new Music(id);

        const index = state.search.result.findIndex((el) => {
            return el.id == id;
        });

        state.music.index = index;

        try {
            // 5) Get the music data
            await state.music.getMusic();

            // 6) Render Music and Audio Data
            musicView.clearMusic();
            clearLoader();
            musicView.renderMusic(state.music.data);
            musicView.updateAudio(state.music.data);
        } catch (error) {
            alert(error);
            clearLoader();
        }

        // 7) Call the lyrics controller
        controlLyrics();

        // 8) Play the song
        musicView.playSong();
    }
};

// ------ Lyrics CONTROLLER ------ //
const controlLyrics = async () => {
    // 1) Create New Lyrics object and add it to state
    state.lyrics = new Lyrics(
        state.music.data.artist.name,
        state.music.data.title_short
    );

    try {
        // 2) Get the Lyrics data =
        await state.lyrics.getLyrics();

        // 3) Render Lyrics data
        lyricsView.clearLyrics();
        clearLoader();
        lyricsView.renderLyrics(state.lyrics.data);
    } catch (error) {
        alert(error);
        clearLoader();
    }
};

window.addEventListener('hashchange', controlMusic);


// Play|Pause Audio on clicking play button
elements.audioPlayBtn.addEventListener('click', () => {
    const isPlaying = elements.audioBox.classList.contains('play');

    if (isPlaying) {
        musicView.pauseSong();
    } else {
        musicView.playSong();
    }
});

// Pause song after it ends
elements.audio.addEventListener('ended', musicView.pauseSong);

const changeSong = (type) => {
    let musicIndex;
    const currentIndex = state.music.index;
    // Update music Index
    if (type === 'prev') {
        musicIndex = musicView.prevSong(currentIndex);
    } else {
        musicIndex = musicView.nextSong(currentIndex);
    }
    // Update music index
    state.music.index = musicIndex;

    // Render new music
    const id = state.search.result[musicIndex].id;
    window.location.hash = id;
}

// Previous Song
elements.audioPrevBtn.addEventListener('click', () => changeSong('prev'));
// Next Song
elements.audioNextBtn.addEventListener('click', () => changeSong('next'));
// Update Progressbar with time of song
elements.audio.addEventListener('timeupdate', musicView.updateProgress);
// Update Progressbar when user clicks on it
elements.audioProgressCont.addEventListener('click', musicView.setProgress);




