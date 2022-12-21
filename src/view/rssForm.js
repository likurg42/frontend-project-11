const renderRssForm = (container, state) => {
    const inputEl = container.querySelector('[name="url"');
    console.log(inputEl);
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
