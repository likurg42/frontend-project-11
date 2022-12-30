import i18next from 'i18next';
import resources from './locale/index.js';
import initView from './view/index.js';
import validate from './utils/validate.js';
import get from './utils/get.js';
import parseRss from './utils/parseRss.js';

const app = (container = document) => {
    const i18n = i18next.createInstance();
    i18n.init({
        lng: 'ru',
        fallbackLng: 'ru',
        resources,
        debug: true,
    }).catch((err) => console.error(err));

    const state = {
        feeds: [],
        posts: [],
        rssForm: {
            state: 'input',
            errors: [],
        },
    };

    const rssFormEl = container.querySelector('.rss-form');
    const postsEl = container.querySelector('.posts');
    const feedsEl = container.querySelector('.feeds');

    const watchedState = initView(state, i18n, {
        rssFormEl,
        postsEl,
        feedsEl,
    });

    rssFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(rssFormEl);
        const currentData = {};

        [...formData].forEach(([key, value]) => {
            currentData[key] = value;
        });

        const errors = validate(currentData, state);

        if (errors.length > 0) {
            watchedState.rssForm.errors = errors;
            watchedState.rssForm.state = 'invalid';
            watchedState.rssForm.state = 'input';
            return;
        }

        get(currentData.url)
            .then((res) => parseRss(res.data.contents))
            .then((data) => {
                const { feed } = data;
                const { posts } = data;

                const feedId = state.feeds.length + 1;

                for (let i = 0; i < posts.length; i += 1) {
                    posts[i].feedId = feedId;
                    posts[i].id = state.posts.length + i + 1;
                }

                feed.id = feedId;
                feed.url = currentData.url;

                watchedState.feeds = [feed].concat(watchedState.feeds);
                watchedState.posts = posts.concat(watchedState.posts);
                watchedState.rssForm.errors = [];
                watchedState.rssForm.state = 'valid';
                watchedState.rssForm.state = 'input';
            })
            .catch((err) => {
                // console.error(err);
                errors.push(err.message);
                watchedState.rssForm.errors = errors;
                watchedState.rssForm.state = 'invalid';
                watchedState.rssForm.state = 'input';
            });
    });
};

export default app;
