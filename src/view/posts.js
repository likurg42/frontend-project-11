const renderPosts = (state, i18n, container) => {
    const fragment = document.createDocumentFragment();
    const postsItemTemplate = container.querySelector('#postsItemTemp');
    const postsListEl = container.querySelector('.posts__list');

    state.posts.forEach((feed) => {
        const postsItemEl = postsItemTemplate.content.cloneNode(true);
        const postsItemLinkEl = postsItemEl.querySelector('.posts-item__link');
        postsItemLinkEl.textContent = feed.title;
        postsItemLinkEl.href = feed.link;
        postsItemLinkEl.dataset.id = feed.id;

        const postsItemBtnEl = postsItemEl.querySelector('.posts-item__btn');
        postsItemBtnEl.textContent = i18n.t('captions.view');
        postsItemBtnEl.dataset.id = feed.id;

        fragment.appendChild(postsItemEl);
    });

    postsListEl.innerHTML = '';
    postsListEl.append(fragment);
};

export default renderPosts;
