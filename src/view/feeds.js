const renderFeeds = (state, i18n, container) => {
    const fragment = document.createDocumentFragment();
    const feedsItemTemplate = container.querySelector('#feedsItemTemp');
    console.log(feedsItemTemplate);
    const feedsListEl = container.querySelector('.feeds__list');

    state.feeds.forEach((feed) => {
        const feedsItemEl = feedsItemTemplate.content.cloneNode(true);
        feedsItemEl.querySelector('.feeds-item__title').textContent = feed.title;
        feedsItemEl.querySelector('.feeds-item__desc').textContent = feed.description;
        fragment.appendChild(feedsItemEl);
    });

    feedsListEl.innerHTML = '';
    feedsListEl.append(fragment);
};

export default renderFeeds;
