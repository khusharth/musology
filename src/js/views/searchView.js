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

    // Only highlight if element is present on page | incase of likes might not be present
    if (document.querySelector(`.results__link[href*="${id}"]`)) {
        document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
    }

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

const limitMusicTitle = (title, limit = 18) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderMusic = (music) => {
    const markup = `
    <li>
        <a class="results__link" href="#${music.id}">
            <figure class="results__fig">
                <img src="${music.album.cover_small}" alt="${limitMusicTitle(music.title_short)}" />
            </figure>
            <div class="results__data">
                <h4 class="results__title">${limitMusicTitle(music.title_short)}</h4>
                <p class="results__author">${music.artist.name}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = (music, pages = 1, resPerPage = 7) => {
    // Render 7 results to current page
    if (music.length !== 0) {
        const start = (pages - 1) * resPerPage;
        const end = pages * resPerPage;

        music.slice(start, end).forEach(renderMusic);

        renderButtons(pages, music.length, resPerPage);

    } else {
        const markup = `
        <li class="error">
           <h2 class="error__message">Sorry! Looks like we dont have the music you are looking for :( <br> Please try another :)<h2>
        </li>
        `;
        elements.searchResList.insertAdjacentHTML('beforeend', markup);

        setTimeout(() => {
            const isShown = elements.searchRes.classList.contains('transform');

            if (isShown) {
                elements.searchRes.classList.remove('transform');
            }
        }, 6000);
    }

};

