export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__input'),
    searchBtn: document.querySelector('.btn__search'),
    likesList: document.querySelector('.likes__list'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    pagination: document.querySelector('.pagination'),
    music: document.querySelector('.music'),
    lyricsCard: document.querySelector('.lyrics__card'),
    audio: document.getElementById('audio'),
    audioBox: document.querySelector('.audio__box'),
    audioImg: document.querySelector('.audio__img'),
    audioTitle: document.querySelector('.audio__title'),
    audioArtist: document.querySelector('.audio__artist'),
    audioPrevBtn: document.querySelector('.audio__btn--prev'),
    audioPlayBtn: document.querySelector('.audio__btn--play'),
    audioNextBtn: document.querySelector('.audio__btn--next'),
    audioPlay: document.querySelector('.audio__play'),
    audioPause: document.querySelector('.audio__pause'),
    audioProgress: document.querySelector('.audio__progress'),
    audioProgressCont: document.querySelector('.audio__progress-container'),
};

export const renderLoader = (parent) => {
    const loader = `
    <div class="loader">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
        <div class="line line4"></div>
        <div class="line line5"></div>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector('.loader');

    // If loader present then clear it
    if (loader) loader.parentElement.removeChild(loader);
};
