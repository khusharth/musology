import axios from 'axios';

export default class Lyrics {
    constructor(artist, song) {
        this.artist = artist;
        this.song = song;
    }

    async getLyrics() {
        const apiUrl = 'https://api.lyrics.ovh/v1/';
        try {
            const lyrics = await axios(`${apiUrl}/${this.artist}/${this.song}`);

            if (lyrics.request.status === 200) {
                this.data = lyrics.data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

            } else {
                this.data = 'Not Found';
            }
        } catch (error) {
            //console.log(error);
            this.data = 'error';
        }
    }
}
