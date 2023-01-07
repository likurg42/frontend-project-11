const PARSER = new window.DOMParser();

const checkValidRSS = (dom) => {
    const errorOnParse = PARSER.parseFromString('<', 'application/xml');
    const parseErrorNS = errorOnParse.getElementsByTagName('parsererror')[0].namespaceURI;
    const parseErrorEls = dom.getElementsByTagNameNS(parseErrorNS, 'parsererror');
    const RSSEls = dom.getElementsByTagName('rss');

    return RSSEls.length === 1 && parseErrorEls.length === 0;
};

const parseRSS = (rss) => {
    const parsedRSS = PARSER.parseFromString(rss, 'text/xml');

    if (!checkValidRSS(parsedRSS)) {
        throw new Error('invalidRSS');
    }

    const itemEls = parsedRSS.querySelectorAll('item');
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

    const feed = {
        title: parsedRSS.querySelector('title').textContent,
        description: parsedRSS.querySelector('description').textContent,
    };

    return {
        feed,
        posts,
    };
};

export default parseRSS;
