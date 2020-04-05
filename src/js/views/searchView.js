import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.pagination.innerHTML = '';
};

export const highlightSelected = (id) => {
    const musicArray = Array.from(document.querySelectorAll('.results__link'));
    musicArray.forEach((el) => {
        el.classList.remove('results__link--active');
    });

    document
        .querySelector(`.results__link[href*="${id}"]`)
        .classList.add('results__link--active');
};

const createButton = (page, type) => `
    <button class="pagination__btn pagination__btn--${type}" data-goto=${
    type === 'left' ? page - 1 : page + 1
}>
        <span>Page ${type === 'left' ? page - 1 : page + 1}</span>
        <svg class="pagination__icon">
            <use href="img/sprite.svg#icon-${type}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, totalResults, resPerPage) => {
    // Calculate no. of pages
    const pages = Math.ceil(totalResults / resPerPage);

    let button;
    // No button for page  pages < 1
    if (page === 1 && pages > 1) {
        // 1st page only button for next page
        button = createButton(page, 'right');
    } else if (page < pages) {
        // 2 buttons | middle pages
        button = `${createButton(page, 'left')}${createButton(page, 'right')}`;
    } else if (page === pages && pages > 1) {
        // 1 button | last page
        button = createButton(page, 'left');
    }

    elements.pagination.insertAdjacentHTML('afterbegin', button);
};

const renderMusic = (music) => {
    const markup = `
    <li>
        <a class="results__link" href="#${music.id}">
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

    renderButtons(pages, music.length, resPerPage);
};
