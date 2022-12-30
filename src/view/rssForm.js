const renderRssForm = (state, i18n, container) => {
    const inputEl = container.querySelector('[name="url"]');
    const feedbackEl = document.querySelector('.feedback');

    switch (state.rssForm.state) {
        case 'invalid':
            inputEl.classList.add('is-invalid');
            inputEl.select();
            feedbackEl.textContent = state.rssForm.errors.map((error) => i18n.t(`errors.${error}`)).join(' ');
            break;
        case 'valid':
            inputEl.classList.remove('is-invalid');
            feedbackEl.textContent = '';
            container.reset();
            break;
        default:
            break;
    }

    inputEl.focus();
};

export default renderRssForm;
