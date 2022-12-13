import _ from 'lodash';
import makeParse from './parser.js';
import loadUrl from './loader.js';

const updateRss = (state) => {
  Promise.all(state.urlForm.loadedUrl.map((link) => {
    const handleEachFeed = loadUrl(link)
      .then((data) => {
        const [, posts] = makeParse(data);
        const diff = _.differenceBy(posts, state.posts, 'title');
        const addIdtodiff = diff.map((item) => ({ ...item, id: _.uniqueId() }));
        state.posts.push(...addIdtodiff);
      });
    return handleEachFeed;
  }));
  setTimeout(() => updateRss(state), 5000);
};

export default updateRss;
