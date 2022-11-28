import * as yup from 'yup';
import onChange from 'on-change';


yup.setLocale({
  string: {
    url: 'Ссылка должна быть валидным URL',
  },
});

const elements = {
  border: document.querySelector('#url-input'),
  form: document.querySelector('.rss'),
};

const validate = (url) => {
  const schema = yup.string().required().url();
  return schema.validate(url);
};
const main = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate(elements.border.value)
      .then((url) => {
        elements.border.classList.remove('red-border');
      })
      .catch((error) => {
        elements.border.classList.add('red-border');
      });
  });
};

export default main;
