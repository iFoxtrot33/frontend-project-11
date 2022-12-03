import onChange from 'on-change';

const validationError = (state, elements, i18n) => {
  if (state.form.error === 'yes') {
    elements.border.classList.add('red-border');
    elements.feedback.classList.replace('text-success', 'text-danger');
    elements.feedback.textContent = i18n.t('text.error');
  }
  if (state.form.error === 'no') {
    elements.border.classList.remove('red-border');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = i18n.t('text.correct');
  }
};

const check = (state, elements, i18n) => {
  validationError(state, elements, i18n);
};

export default check;
