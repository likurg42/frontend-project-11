export default (state, i18n, container = document) => {
  const leadEl = container.querySelector('[data-caption-lead]');
  const titleEl = container.querySelector('[data-caption-title]');
  leadEl.textContent = i18n.t('captions.lead');
  titleEl.textContent = i18n.t('captions.title');
};
