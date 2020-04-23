import { elements } from './base';

export const toggleLikeBtn = isLiked => {
    const icon = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.music__btn use').setAttribute('href', `img/sprite.svg#${icon}`);
};

export const renderLike = (like) => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="Image">
            </figure>
            <div class="likes__data">
                <h4 class="likes__title">${like.title}</h4>
                <p class="likes__author">${like.artist}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    // select <a> parent <li>
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    // If present remove it
    if (el) el.parentElement.removeChild(el);
};

export const checkLikes = (likes) => {

    // If no likes then display message
    if (likes === 0) {
        elements.noLike.style.display = "block";
    } else {
        elements.noLike.style.display = "none";
    }
};