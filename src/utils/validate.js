import * as yup from 'yup';

const validate = (fields, state) => {
    const feedsUrls = state.feeds.map((feed) => feed.url);
    const schema = yup.object().shape({
        url: yup
            .string()
            .trim()
            .url()
            .test(
                'Unique URL',
                () => 'alreadyExists',
                (url) => !feedsUrls.includes(url),
            )
            .required(),
    });
    try {
        schema.validateSync(fields, { abortEarly: false });
        return [];
    } catch (e) {
        return e.errors;
    }
};

export default validate;
