import { elements } from './base';

export const clearLyrics = () => {
    elements.lyricsCard.innerHTML = '';
};

export const renderLyrics = (lyrics) => {
    if (lyrics !== 'Not Found' && lyrics !== 'error') {
        const markup = `
        <div class="lyrics__data">
            ${lyrics}
        </div>
        `;
        elements.lyricsCard.insertAdjacentHTML('afterbegin', markup);
    } else {
        const markup = `
        <div class="lyrics__data error">
           <h2 class="error__message">Sorry! Looks like we dont have the lyrics you are looking for :( <br> Please try another song :)<h2>
        </div>
        `;
        elements.lyricsCard.insertAdjacentHTML('afterbegin', markup);
    }

};
