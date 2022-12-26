import onChange from 'on-change';
import renderRssForm from './rssForm.js';
import renderTitle from './title.js';

const initView = (state, i18n, containers) => {
    renderTitle(state, i18n);
    renderRssForm(state, i18n, containers.rssFormEl);

    return onChange(state, (path) => {
        switch (path) {
            case 'rssForm.state':
                renderRssForm(state, i18n, containers.rssFormEl);
                break;
            default:
                break;
        }
    });
};

export default initView;
