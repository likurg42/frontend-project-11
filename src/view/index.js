import onChange from 'on-change';
import renderFeeds from './feeds.js';
import renderRssForm from './rssForm.js';
import renderTitle from './title.js';
import renderPosts from './posts.js';
import renderPreviewPost from './previewPost.js';

const initView = (state, i18n, containers) => {
  renderTitle(state, i18n);
  renderRssForm(state, i18n, containers.rssFormEl);

  return onChange(state, (path) => {
    switch (path) {
      case 'posts':
        renderPosts(state, i18n, containers.postsEl);
        break;
      case 'addFeed.state':
        renderFeeds(state, i18n, containers.feedsEl);
        break;
      case 'rssForm.state':
        renderRssForm(state, i18n, containers.rssFormEl);
        break;
      case 'uiState.previewPost.postId':
        renderPreviewPost(state, i18n, containers.previewPostEl);
        break;
      case 'uiState.visitedPosts':
        renderPosts(state, i18n, containers.postsEl);
        break;
      default:
        break;
    }
  });
};

export default initView;
