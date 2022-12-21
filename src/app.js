import initView from './view/index.js';
import validate from './validate.js';

const app = (container = document) => {
    const state = {
        feeds: [],
        rssForm: {
            state: 'input',
            errors: [],
        },
    };

    const rssFormEl = container.querySelector('.rss-form');

    const watchedState = initView(state, {
        rssFormEl,
    });

    rssFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(rssFormEl);
        const currentData = {};

        [...formData].forEach(([key, value]) => {
            currentData[key] = value;
        });

        const errors = validate(currentData, state);

        if (Object.keys(errors).length === 0) {
            watchedState.feeds.push(currentData.url);
            watchedState.rssForm.state = 'valid';
            state.rssForm.state = 'input';
        } else {
            watchedState.rssForm.state = 'invalid';
        }

        watchedState.rssForm.errors = errors;
    });
};

export default app;
