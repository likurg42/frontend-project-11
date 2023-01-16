export default function renderPreviewPost(state, i18n, container) {
  const contentEl = container.querySelector('.preview-post__content');
  const titleEl = container.querySelector('.preview-post__title');
  const linkEl = container.querySelector('.preview-post__link');
  const buttonEl = container.querySelector('.preview-post__button');

  buttonEl.textContent = i18n.t('captions.close');
  linkEl.textContent = i18n.t('captions.readFull');

  const {
    title,
    link,
    description,
  } = state.posts.find(({ id }) => id === state.uiState.previewPost.postId);

  contentEl.textContent = description;
  linkEl.href = link;
  titleEl.textContent = title;
}
