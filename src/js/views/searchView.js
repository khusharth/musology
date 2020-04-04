import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

const renderMusic = music => {
    const markup = `
    <li>
        <a class="results__link" href="${music.id}">
            <figure class="results__fig">
                <img src="${music.album.cover_small}" alt="${music.title_short}" />
            </figure>
            <div class="results__data">
                <h4 class="results__title">${music.title_short}</h4>
                <p class="results__author">${music.artist.name}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (music, pages = 1, resPerPage = 7) => {
    // Render 7 results to current page
    const start = (pages - 1) * resPerPage;
    const end = pages * resPerPage;

    music.slice(start, end).forEach(renderMusic);
};
