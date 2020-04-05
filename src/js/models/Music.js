import axios from 'axios';

export default class Music {
    constructor(id) {
        this.id = id;
    }

    async getMusic() {
        const host = 'deezerdevs-deezer.p.rapidapi.com';
        const key = process.env.API_KEY;

        try {
            const res = await axios(
                `https://deezerdevs-deezer.p.rapidapi.com/track/${this.id}`,
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': host,
                        'x-rapidapi-key': key,
                    },
                }
            );

            this.data = res.data;
            console.log(this.data);
        } catch (error) {
            alert(error);
        }
    }
}
