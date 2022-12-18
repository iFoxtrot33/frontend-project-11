import onChange from 'on-change';
import renderError from './renders/error.js';
import renderSuccessfulDonwload from './renders/success.js';
import renderFeeds from './renders/feeds.js';
import renderContens from './renders/contents.js';
import renderManagementForm from './renders/form.js';

const watching = (state, elements, i18n) => onChange(state, (path, newValue) => {
  switch (path) {
    case 'error':
      renderError(elements, newValue, i18n);
      return;
    case 'process':
      renderManagementForm(elements, newValue);
      return;
    case 'urlsList':
      renderSuccessfulDonwload(elements, 'validRSS', i18n);
      return;
    case 'dataRSS.feeds':
      renderFeeds(elements, newValue, i18n);
      return;
    case 'dataRSS.contents':
      renderContens(elements, newValue, i18n, state.dataRSS.activesId);
      return;
    case 'dataRSS.activesId':
      renderContens(elements, state.dataRSS.contents, i18n, newValue);
      return;
    default:
      throw Error(`Error state: ${path}`);
  }
});
export default watching;
