import onChange from 'on-change';
import renderRssForm from './rssForm.js';

const initView = (state, containers) =>
    onChange(state, (path) => {
        switch (path) {
            case 'rssForm.state':
                renderRssForm(containers.rssFormEl, state);
                break;
            default:
                break;
        }
    });

export default initView;
