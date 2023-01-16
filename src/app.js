import i18next from 'i18next';
import { v4 as generateID } from 'uuid';
import resources from './locale/index.js';
import initView from './view/index.js';
import validate from './utils/validate.js';
import getData from './utils/getData.js';
import parseRSS from './utils/parseRSS.js';
import startUpdatingPosts from './utils/updatePosts.js';

const app = (container = document) => {
  const i18n = i18next.createInstance();
  const currLng = window.navigator.language;

  i18n
    .init({
      lng: currLng,
      fallbackLng: 'ru',
      resources,
      debug: true,
    })
    .catch((err) => console.error(err));

  document.title = i18n.t('captions.title');

  const state = {
    feeds: [],
    posts: [],
    rssForm: {
      state: 'input',
      error: null,
    },
    addFeed: {
      state: 'waiting',
      error: null,
    },
    uiState: {
      visitedPosts: new Set(),
      previewPost: {
        postId: null,
      },
    },
  };

  const rssFormEl = container.querySelector('.rss-form');
  const inputEl = container.querySelector('[aria-label="url"]');
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

    const feedsUrls = state.feeds.map((feed) => feed.url);

    validate(currentData, feedsUrls)
      .catch((err) => {
        console.log(err.message);
        watchedState.rssForm.error = err.message;
        watchedState.rssForm.state = 'invalid';
        return Promise.reject(err);
      })
      .then(() => {
        watchedState.rssForm.error = null;
        watchedState.addFeed.state = 'started';
        return getData(currentData.url);
      })
      .then((res) => {
        const data = parseRSS(res.data.contents);
        const { feed, posts } = data;
        const feedId = generateID();

        const parsedPosts = posts.map((post) => ({
          ...post,
          feedId,
          id: generateID(),
        }));

        const parsedFeed = {
          ...feed,
          id: feedId,
          url: currentData.url,
        };

        state.feeds = [parsedFeed].concat(watchedState.feeds);
        state.addFeed.error = null;

        watchedState.rssForm.state = 'valid';
        watchedState.addFeed.state = 'successful';
        watchedState.posts = [...parsedPosts, ...watchedState.posts];
      })
      .catch((err) => {
        console.log(err);
        state.addFeed.error = err.message;
        watchedState.addFeed.state = 'unsuccessful';
      });
  });

  rssFormEl.addEventListener('input', (e) => {
    if (e.target === inputEl) {
      console.log('here in input');
      state.rssForm.errors = [];
      watchedState.rssForm.state = 'input';
    }
  });

  postsEl.addEventListener('click', ({ target }) => {
    if (target.classList.contains('posts-item__btn')) {
      const { id } = target.dataset;
      watchedState.uiState.visitedPosts.add(id);
      watchedState.uiState.previewPost.postId = id;
    }

    if (target.classList.contains('posts-item__link')) {
      const { id } = target.dataset;
      watchedState.uiState.visitedPosts.add(id);
    }
  });

  const interval = 5000;
  startUpdatingPosts(watchedState, interval);
};

export default app;
