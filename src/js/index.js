import * as yup from 'yup';
import i18next from 'i18next';
import _ from 'lodash';
import axios from 'axios';
import modifyUrl from './urlModifier';
import makeParse from './parser.js';
import watching from './view.js';
import resources from './locales/index.js';

const addEventActiveEl = (view, state) => {
  const listGroup = document.getElementById('posts');
  listGroup.addEventListener('click', (e) => {
    if (state.dataRSS.activesId.indexOf(e.target.id) === -1) {
      view.dataRSS.activesId.push(e.target.id);
      addEventActiveEl(view, state);
    }
  });
};

const main = () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('input'),
    containerSubmit: document.getElementById('submit-button'),
    feedback: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    modal: document.getElementById('modal'),
    body: document.querySelector('body'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    btnPrimary: document.querySelector('.btn-primary'),
    btnClose: document.querySelector('.btn-close'),
    btnSecondary: document.querySelector('.btn-secondary'),
  };
  const state = {
    process: 'edit',
    error: null,
    urlsList: [],
    dataRSS: {
      feeds: [],
      contents: [],
      activesId: [],
    },
  };
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => {
    const view = watching(state, elements, i18n);
    const runTimer = () => {
      const promises = state.urlsList.map((url) => {
        const newUrl = modifyUrl(url);
        return axios(newUrl);
      });
      const promiseAll = Promise.all(promises);
      promiseAll.then((responses) => {
        responses.forEach((response) => {
          const { contents } = makeParse(response.data.contents);
          contents.forEach((item) => {
            const newPost = !state.dataRSS.contents.find((item2) => item.title === item2.title);
            if (newPost) {
              const id = _.uniqueId();
              view.dataRSS.contents.push({ ...item, id });
              addEventActiveEl(view, state);
              const listGroup = document.getElementById('posts');
              listGroup.addEventListener('click', (e) => {
                e.preventDefault();
                if (state.dataRSS.activesId.indexOf(e.target.id) === -1) {
                  view.dataRSS.activesId.push(e.target.id);
                }
              });
            }
          });
          addEventActiveEl(view, state);
        });
        setTimeout(runTimer, 5000);
      })
        .finally(() => {
          setTimeout(runTimer, 5000);
        });
      return null;
    };
    runTimer();
    elements.form.addEventListener('submit', (e) => {
      e.preventDefault();
      view.error = null;
      const formData = new FormData(e.target);
      view.process = 'send';
      const enteredByUrl = formData.get('url');
      const schema = yup.string().url('notValidUrls').notOneOf(state.urlsList, 'workedRSS');
      schema.validate(enteredByUrl)
        .then((url) => {
          axios(modifyUrl(url))
            .then((response) => {
              const { feed, contents } = makeParse(response.data.contents);
              contents.forEach((item) => {
                view.dataRSS.contents.push({ ...item, id: _.uniqueId() });
              });
              view.dataRSS.feeds.push(feed);
              view.urlsList.push(url);
            })
            .then(() => {
              addEventActiveEl(view, state);
            })
            .then(() => {
              view.process = 'edit';
            })
            .catch((err) => {
              if (err.request) {
                view.error = 'errors.disconnect';
                view.process = 'edit';
              } else {
                view.error = 'errors.notValidRSS';
                view.process = 'edit';
              }
            });
        })
        .catch((err) => {
          view.error = `errors.${err.message}`;
          view.process = 'edit';
        });
    });
  })
    .catch(() => {
      throw Error('Initialization error i18next!');
    });
};

export default main;
