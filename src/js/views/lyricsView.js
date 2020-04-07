import { elements } from './base';

export const clearLyrics = () => {
    elements.lyricsCard.innerHTML = '';
};

export const renderLyrics = (lyrics) => {
    const markup = `
    <div class="lyrics__data">
        ${lyrics}
    </div>
    `;

    elements.lyricsCard.insertAdjacentHTML('afterbegin', markup);
};
