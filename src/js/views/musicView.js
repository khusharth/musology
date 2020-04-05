import { elements } from './base';

export const renderMusic = (music) => {
    const min = Math.floor(music.duration / 60);
    let sec = music.duration - min * 60;
    if (sec < 10) {
        sec = '0' + sec;
    }

    const markup = `
    <div class="music__data">
        <figure class="music__fig">
            <img src="${music.album.cover_medium}" alt="${music.title_short}">
        </figure>
        <div class="music__details">
            <div class="music__title">${music.title_short}</div>
            <div class="music__artist">${music.artist.name}</div>
        </div>
    </div>

    <div class="music__sub-details">
        <div class="music__duration">Duration:&nbsp;&nbsp;${min}:${sec} min</div>
        <div class="music__like">
            <button class="btn music__btn">
                <svg class="music__heart">
                    <use xlink:href="img/sprite.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>
    </div>
    `;
    elements.music.insertAdjacentHTML('beforeend', markup);
};

export const clearMusic = () => {
    elements.music.innerHTML = '';
};
