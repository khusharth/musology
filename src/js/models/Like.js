export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(music) {
        const like = {
            id: music.id,
            title: music.title_short,
            artist: music.artist.name,
            img: music.album.cover_small
        };
        this.likes.push(like);
        // Persist Data in localstorage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id == id);
        this.likes.splice(index, 1);

        // Persist Data in localstorage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id == id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restoring likes from local storage (null if no ikes)
        if (storage) this.likes = storage;

    }
} 