import { elements } from './base';

const reduceFont = (title, limit = 35) => {
    if (title.length > limit) {
        return true;
    } else {
        return false;
    }

}

// Display Music data
export const renderMusic = (music, isLiked) => {
    // Convert from seconds to minutes:seconds
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
            <div class="music__title ${reduceFont(music.title_short) ? 'music__title--small' : ''}">${music.title_short}</div>
            <div class="music__artist">${music.artist.name}</div>
        </div>
    </div>

    <div class="music__sub-details">
        <div class="music__duration">Duration:&nbsp;&nbsp;${min}:${sec} min</div>
        <div class="music__like">
            <button class="btn music__btn">
                <svg class="music__heart">
                    <use xlink:href="img/sprite.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
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

// Add data to audio section
export const updateAudio = (music) => {
    elements.audio.src = `${music.preview}`;
    elements.audioImg.src = `${music.album.cover_medium}`;
    elements.audioTitle.innerText = `${music.title_short}`;
    elements.audioArtist.innerText = `${music.artist.name}`;
};

export const playSong = async () => {
    // If no audio
    if (elements.audio.src === '') {
        // Nothing happens
    } else {

        // Change the button SVG
        elements.audioPlay.style.display = 'none';
        elements.audioPause.style.display = 'block';

        try {
            // Wait for audio to Load
            await elements.audio.play();
            elements.audioBox.classList.add('play');

        } catch (error) {
            console.log('Failed to play...' + error);
        }
    }
};

export const pauseSong = () => {
    elements.audioBox.classList.remove('play');
    elements.audioPlay.style.display = 'block';
    elements.audioPause.style.display = 'none';

    elements.audio.pause();
};

export const prevSong = (index) => {
    let musicIndex = index - 1;

    if (musicIndex < 0) {
        musicIndex = 0;
    }
    if (musicIndex === 6 || musicIndex === 13 || musicIndex === 20) {
        document.querySelector('.pagination__btn--left').click();
    }
    return musicIndex;
};

export const nextSong = (index) => {
    let musicIndex = index + 1;

    if (musicIndex > 24) {
        musicIndex = 24;
    }

    if (musicIndex % 7 === 0) {
        document.querySelector('.pagination__btn--right').click();
    }

    return musicIndex;
};

export const updateProgress = (event) => {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    elements.audioProgress.style.width = `${progressPercent}%`;
};

export const setProgress = (event) => {
    const width = elements.audioProgressCont.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
};

// Animate Title on phone if its bigger than a limit
export const animateTitle = (title, limit = 14) => {
    const isAnimated = elements.audioTitle.classList.contains('audio__title--animate');

    if (title.length > limit) {
        if (!isAnimated) {
            elements.audioTitle.classList.add('audio__title--animate');
        }
    } else {
        if (isAnimated) {
            elements.audioTitle.classList.remove('audio__title--animate');
        }
    }
}

// Animate Artist on phone if its bigger than a limit
export const animateArtist = (artist, limit = 14) => {
    const isAnimated = elements.audioArtist.classList.contains('audio__title--animate');

    if (artist.length > limit) {
        if (!isAnimated) {
            elements.audioArtist.classList.add('audio__title--animate');
        }
    } else {
        if (isAnimated) {
            elements.audioArtist.classList.remove('audio__title--animate');
        }
    }
}
