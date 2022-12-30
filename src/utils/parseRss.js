const parser = new window.DOMParser();

const checkValidRss = (dom) => {
    const errorOnParse = parser.parseFromString('<', 'application/xml');
    const parseErrorNS = errorOnParse.getElementsByTagName('parsererror')[0].namespaceURI;
    const parseErrorEls = dom.getElementsByTagNameNS(parseErrorNS, 'parsererror');
    const RSSEls = dom.getElementsByTagName('rss');

    return RSSEls.length === 1 && parseErrorEls.length === 0;
};

const parseRss = (rss) => {
    const dom = parser.parseFromString(rss, 'text/xml');

    if (!checkValidRss(dom)) {
        throw new Error('invalidRSS');
    }

    const itemEls = dom.querySelectorAll('item');
    const posts = [];

    itemEls.forEach((item) => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;

        posts.push({
            title,
            link,
            description,
        });
    });

    const title = dom.querySelector('title').textContent;
    const description = dom.querySelector('description').textContent;

    return {
        feed: {
            title,
            description,
        },
        posts,
    };
};

export default parseRss;
