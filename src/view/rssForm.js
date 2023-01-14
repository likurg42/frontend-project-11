const renderRssForm = (state, i18n, container) => {
    const inputEl = container.querySelector('[name="url"]');
    const feedbackEl = container.querySelector('.rss-form__feedback');
    const labelEl = container.querySelector('.rss-form__label');
    const exampleEl = container.querySelector('.rss-form__example');
    const buttonEl = container.querySelector('.rss-form__button');

    labelEl.textContent = i18n.t('form.rssLink');
    exampleEl.textContent = i18n.t('form.example');
    buttonEl.textContent = i18n.t('form.add');

    switch (state.rssForm.state) {
        case 'invalid':
            inputEl.classList.add('is-invalid');
            inputEl.select();
            feedbackEl.textContent = state.rssForm.errors.map((error) => i18n.t(`errors.${error}`)).join(' ');
            feedbackEl.classList.add('text-danger');
            break;
        case 'valid':
            inputEl.classList.remove('is-invalid');
            feedbackEl.textContent = '';
            container.reset();
            feedbackEl.textContent = i18n.t('form.success');
            feedbackEl.classList.add('text-success');
            break;
        default:
            break;
    }

    inputEl.focus();
};

export default renderRssForm;
