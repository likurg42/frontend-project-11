import axios from 'axios';

const get = (url) =>
    axios.get('https://allorigins.hexlet.app/get', {
        params: {
            url,
        },
    });

export default get;
