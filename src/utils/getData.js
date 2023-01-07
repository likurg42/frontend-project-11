import axios from 'axios';

const getData = (url) =>
    axios.get('https://allorigins.hexlet.app/get', {
        params: {
            url,
        },
    });

export default getData;
