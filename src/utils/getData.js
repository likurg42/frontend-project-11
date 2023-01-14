import axios from 'axios';

const getData = (url) =>
    axios.get('https://allorigins.hexlet.app/get', {
        params: {
            url,
            'disableCache': true,
        },
    });

export default getData;
