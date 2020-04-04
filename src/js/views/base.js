export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__input'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list')
};

export const renderLoader = parent => {
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

