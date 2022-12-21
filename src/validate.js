import { keyBy } from 'lodash';
import * as yup from 'yup';

yup.addMethod(yup.string, 'uniqueFeed', function uniqueFeed(feeds = []) {
    return this.test((url) => !feeds.includes(url));
});

const validate = (fields, state) => {
    const schema = yup.object().shape({
        url: yup.string().trim().url().uniqueFeed(state.feeds).required(),
    });
    try {
        schema.validateSync(fields, { abortEarly: false });
        return [];
    } catch (e) {
        return keyBy(e.inner, 'path');
    }
};

export default validate;
