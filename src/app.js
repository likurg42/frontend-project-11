import i18next from 'i18next';
import resources from './locale/index.js';
import initView from './view/index.js';
import validate from './utils/validate.js';
import getData from './utils/getData.js';
import parseRSS from './utils/parseRSS.js';
import startUpdatingPosts from './utils/updatePosts.js';

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
        uiState: {
            visitedPosts: new Set(),
            previewPost: {
                postId: null,
            },
        },
    };

    const rssFormEl = container.querySelector('.rss-form');
    const postsEl = container.querySelector('.posts');
    const feedsEl = container.querySelector('.feeds');
    const previewPostEl = container.querySelector('.preview-post');

    const watchedState = initView(state, i18n, {
        rssFormEl,
        postsEl,
        feedsEl,
        previewPostEl,
    });

    rssFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(rssFormEl);
        const currentData = {};

        [...formData].forEach(([key, value]) => {
            currentData[key] = value;
        });

        validate(currentData, state)
            .then(() => getData(currentData.url))
            .then((res) => parseRSS(res.data.contents))
            .then((data) => {
                const { feed, posts } = data;
                const feedId = state.feeds.length + 1;
                const parsedPosts = posts.map((post, i) => ({
                    ...post,
                    feedId,
                    id: state.posts.length + i + 1,
                }));
                const parsedFeed = { ...feed, id: feedId, url: currentData.url };

                watchedState.feeds = [parsedFeed].concat(watchedState.feeds);
                watchedState.posts = [...parsedPosts, ...watchedState.posts];
                watchedState.rssForm.errors = [];
                watchedState.rssForm.state = 'valid';
            })
            .catch((err) => {
                console.log(err.message);
                watchedState.rssForm.errors.push(err.message.split(' ')[0]);
                watchedState.rssForm.state = 'invalid';
            })
            .then(() => {
                watchedState.rssForm.errors = [];
                watchedState.rssForm.state = 'input';
            });
    });

    const interval = 5000;
    startUpdatingPosts(watchedState, interval);

    postsEl.addEventListener('click', ({ target }) => {
        if (target.classList.contains('posts-item__btn')) {
            const { id } = target.dataset;
            watchedState.uiState.visitedPosts.add(parseInt(id, 10));
            watchedState.uiState.previewPost.postId = parseInt(id, 10);
        }

        if (target.classList.contains('posts-item__link')) {
            const { id } = target.dataset;
            watchedState.uiState.visitedPosts.add(parseInt(id, 10));
        }
    });
};

export default app;
