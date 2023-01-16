import * as yup from 'yup';

const validate = (fields, feedsUrls) => {
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

  return schema.validate(fields);
};

export default validate;
