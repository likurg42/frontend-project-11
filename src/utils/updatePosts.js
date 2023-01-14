import getData from './getData.js';
import parseRSS from './parseRSS.js';

const updatePosts = (watchedState, interval) => {
  const { feeds, posts } = watchedState;

  const promises = feeds.map((feed) => {
    const { url, id } = feed;
    const currentPosts = posts.filter((post) => post.feedId === id);
    const currentPostsTitles = currentPosts.map((post) => post.title);

    return getData(url)
      .then((res) => {
        const { posts: updatedPosts } = parseRSS(res.data.contents);
        const newPosts = updatedPosts.filter((post) => {
          const { title } = post;
          return !currentPostsTitles.includes(title);
        });

        const parsedPosts = newPosts.map((post, i) => ({
          ...post,
          feedId: id,
          id: watchedState.posts.length + i + 1,
        }));

        watchedState.posts = parsedPosts.concat(watchedState.posts);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  Promise.all(promises).finally(() => {
    setTimeout(() => {
      updatePosts(watchedState, interval);
    }, interval);
  });
};

export default updatePosts;
