const renderRssForm = (state, i18n, container) => {
    const inputEl = container.querySelector('[name="url"]');

    switch (state.rssForm.state) {
        case 'invalid':
            inputEl.classList.add('is-invalid');
            inputEl.select();
            break;
        case 'valid':
            inputEl.classList.remove('is-invalid');
            container.reset();
            break;
        default:
            break;
    }

    inputEl.focus();
};

export default renderRssForm;
