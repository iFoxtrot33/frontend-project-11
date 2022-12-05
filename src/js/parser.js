const makeParse = (content) => {
  const parser = new DOMParser();
  const parsedContent = parser.parseFromString(content, 'text/html');
  const parseError = parsedContent.querySelector('parsererror');
  if (parseError) {
    throw new Error('inValidRss');
  } else {
    const title = parsedContent.querySelector('title').textContent;
    const description = parsedContent.querySelector('description').textContent;
    const parsedPosts = parsedContent.querySelectorAll('item');
    const posts = Array.from(parsedPosts).map((post) => {
      const titlePost = post.querySelector('title').textContent;
      const descriptionPost = post.querySelector('description').textContent;
      const linkPost = post.querySelector('link').textContent;

      return {
        titlePost,
        descriptionPost,
        linkPost,
      };
    });
    return {
      title,
      description,
      posts,
    };
  }
};

export default makeParse;
