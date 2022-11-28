import * as yup from 'yup';

yup.setLocale({
  string: {
    url: 'Ссылка должна быть валидным URL',
  },
});

const elements = {
  border: document.querySelector('#url-input'),
  form: document.querySelector('.rss'),
  danger: document.querySelector('.hide'),
};

const validate = (url) => {
  const schema = yup.string().required().url();
  return schema.validate(url);
};
const main = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate(elements.border.value)
      .then(() => {
        elements.border.classList.remove('red-border');
        elements.danger.style.display = 'none';
      })
      .catch(() => {
        elements.border.classList.add('red-border');
        elements.danger.style.display = 'inline-block';
      });
  });
};

export default main;
