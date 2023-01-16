const renderFeeds = (state, i18n, container) => {
  const feedbackEl = document.querySelector('.feedback');
  switch (state.addFeed.state) {
    case 'unsuccessful': {
      feedbackEl.textContent = i18n.t(`errors.${state.addFeed.error}`);
      feedbackEl.classList.add('text-danger');
      feedbackEl.classList.remove('text-success');
      break;
    }
    case 'successful': {
      if (!container.classList.contains('feeds--show')) container.classList.add('feeds--show');

      const fragment = document.createDocumentFragment();
      const feedsItemTemplate = container.querySelector('#feedsItemTemp');
      const feedsListEl = container.querySelector('.feeds__list');
      const feedsTitleEl = container.querySelector('.feeds__title');

      feedsTitleEl.textContent = i18n.t('captions.feeds');

      state.feeds.forEach((feed) => {
        const feedsItemEl = feedsItemTemplate.content.cloneNode(true);
        feedsItemEl.querySelector('.feeds-item__title').textContent = feed.title;
        feedsItemEl.querySelector('.feeds-item__desc').textContent = feed.description;
        fragment.appendChild(feedsItemEl);
      });

      feedsListEl.innerHTML = '';
      feedsListEl.append(fragment);
      break;
    }
    default:
      break;
  }
};

export default renderFeeds;
