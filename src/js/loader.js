import axios from 'axios';

const loadUrl = (link) => {
  const mainUrl = new URL('/get?', 'https://allorigins.hexlet.app');
  mainUrl.searchParams.append('disableCache', true);
  mainUrl.searchParams.append('charset', 'utf-8');
  mainUrl.searchParams.append('url', link);
  return axios.get(mainUrl.toString());
};

export default loadUrl;
