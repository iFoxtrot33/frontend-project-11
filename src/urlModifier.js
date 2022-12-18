const modifyUrl = (url) => {
  const responce = new URL('get', 'https://allorigins.hexlet.app');
  responce.searchParams.set('disableCache', 'true');
  responce.searchParams.set('url', url);
  return responce.toString();
};

export default modifyUrl;
