const renderPosts = (state, i18n, container) => {
  if (!container.classList.contains('posts--show')) container.classList.add('posts--show');

  const fragment = document.createDocumentFragment();
  const postsItemTemplate = container.querySelector('#postsItemTemp');
  const postsListEl = container.querySelector('.posts__list');
  const postsTitleEl = container.querySelector('.posts__title');

  postsTitleEl.textContent = i18n.t('captions.posts');

  state.posts.forEach((post) => {
    const postsItemEl = postsItemTemplate.content.cloneNode(true);
    const postsItemLinkEl = postsItemEl.querySelector('a');
    postsItemLinkEl.textContent = post.title;
    postsItemLinkEl.href = post.link;
    postsItemLinkEl.dataset.id = post.id;

    if (state.uiState.visitedPosts.has(post.id)) {
      postsItemLinkEl.classList.remove('fw-bold');
      postsItemLinkEl.classList.add('fw-normal', 'link-secondary');
    }
    const postsItemBtnEl = postsItemEl.querySelector('.posts-item__btn');
    postsItemBtnEl.textContent = i18n.t('captions.view');
    postsItemBtnEl.dataset.id = post.id;

    fragment.appendChild(postsItemEl);
  });

  postsListEl.innerHTML = '';
  postsListEl.append(fragment);
};

export default renderPosts;
