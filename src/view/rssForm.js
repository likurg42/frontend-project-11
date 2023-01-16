const renderRssForm = (state, i18n, container) => {
  const inputEl = container.querySelector('.rss-form [name="url"]');
  const labelEl = container.querySelector('.rss-form__label');
  const exampleEl = container.querySelector('.rss-form__example');
  const buttonEl = container.querySelector('.rss-form__button');
  const feedbackEl = document.querySelector('.feedback');

  labelEl.textContent = i18n.t('form.rssLink');
  exampleEl.textContent = i18n.t('form.example');
  buttonEl.textContent = i18n.t('form.add');

  switch (state.rssForm.state) {
    case 'input': {
      inputEl.classList.remove('is-invalid');
      break;
    }
    case 'invalid': {
      inputEl.classList.add('is-invalid');
      inputEl.select();
      feedbackEl.textContent = i18n.t(`errors.${state.rssForm.error}`);
      feedbackEl.classList.add('text-danger');
      feedbackEl.classList.remove('text-success');
      break;
    }
    case 'valid':
      inputEl.classList.remove('is-invalid');
      feedbackEl.classList.add('text-success');
      feedbackEl.classList.remove('text-danger');
      feedbackEl.textContent = i18n.t('form.success');
      container.reset();
      break;
    default:
      break;
  }

  inputEl.focus();
};

export default renderRssForm;
