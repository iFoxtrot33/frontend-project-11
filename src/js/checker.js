import onChange from 'on-change';

const validateError = (error, elements, i18n) => {
  if (error === 'yes') {
    elements.border.classList.add('red-border');
    elements.feedback.classList.replace('text-success', 'text-danger');
    elements.feedback.textContent = i18n.t('text.error');
  }
  if (error === 'no') {
    elements.border.classList.remove('red-border');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.feedback.textContent = i18n.t('text.correct');
  }
};


export default validateError;
