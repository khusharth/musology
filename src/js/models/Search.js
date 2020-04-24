import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const host = 'deezerdevs-deezer.p.rapidapi.com';
        const key = process.env.API_KEY;
        try {
            // wait for response
            const res = await axios(
                `https://deezerdevs-deezer.p.rapidapi.com/search?q=${this.query}`,
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': host,
                        'x-rapidapi-key': key,
                    },
                }
            );
            this.result = res.data.data;
            //console.log(this.result);
        } catch (error) {
            console.log(error);
        }
    };

    async getPlaylist() {
        const host = 'deezerdevs-deezer.p.rapidapi.com';
        const key = process.env.API_KEY;

        try {
            const res = await axios(
                "https://deezerdevs-deezer.p.rapidapi.com/playlist/1963962142",
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': host,
                        'x-rapidapi-key': key,
                    },
                }
            );

            this.result = res.data.tracks.data;
            console.log(this.result);
        } catch (error) {
            console.log(error);
        }
    };
}
