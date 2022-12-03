import * as yup from 'yup';
import i18next from 'i18next';
import ru from './locales/ru.js';
import validateError from './checker.js';
import onChange from 'on-change';

const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

yup.setLocale({
  string: {
    url: 'error',
  },
});

const state = {
  form: {
    error: 'no',
  },
};

const elements = {
  border: document.querySelector('#url-input'),
  form: document.querySelector('.rss'),
  test: document.querySelector('.mx-auto'),
  check: document.querySelector('text-danger'),
  feedback: document.querySelector('.feedback'),
};

const watchedState = onChange(state, (path, value) => validateError(value, elements, i18n));

const validate = (url) => {
  const schema = yup.string().required().url();
  return schema.validate(url);
};
const main = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate(elements.border.value.trim())
      .then(() => {
        watchedState.form.error = 'no';
      //  check(state, elements, i18n);
      })
      .catch((err) => {
        watchedState.form.error = 'yes';
      //  check(state, elements, i18n);
      });
  });
};

export default main;
