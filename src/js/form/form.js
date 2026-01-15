/**
 * Form Component - Character Counter
 * Maneja el contador de caracteres para el textarea del formulario
 */

function initFormCharCounter() {
  const formContainer = document.querySelector('.form-container__right');

  if (!formContainer) return;

  const messageTextarea = formContainer.querySelector('#message');
  const charCount = formContainer.querySelector('.form-field__char-count');

  if (!messageTextarea || !charCount) {
    console.warn('Form char counter: elementos no encontrados');
    return;
  }

  function updateCharCount() {
    const currentLength = messageTextarea.value.length;
    const maxLength = messageTextarea.getAttribute('maxlength') || 500;
    charCount.textContent = `${currentLength}/${maxLength}`;
  }

  updateCharCount();

  messageTextarea.addEventListener('input', updateCharCount);
  messageTextarea.addEventListener('paste', () => {
    setTimeout(updateCharCount, 0);
  });
}

/**
 * Form Component - Custom Select Initialization
 * Inicializa el custom select del formulario
 */
function initFormSelect() {
  if (!window.CustomSelectHandlers) {
    console.error('CustomSelectHandlers module not loaded');
    return;
  }

  const formSelect = document.querySelector(
    '.form-container__right .custom-select'
  );
  if (!formSelect) return;

  const trigger = formSelect.querySelector('.select-trigger');
  const list = formSelect.querySelector('.select-list');
  const valueEl = formSelect.querySelector('.select-value, .value');

  if (!trigger || !list) return;

  if (trigger.dataset.initialized === 'true') return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    window.CustomSelectHandlers.handleTriggerClick(trigger, formSelect);
  });

  list.querySelectorAll('li').forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      window.CustomSelectHandlers.handleOptionClick(
        option,
        formSelect,
        list,
        valueEl,
        trigger
      );
    });
  });

  trigger.dataset.initialized = 'true';
}

function initForm() {
  requestAnimationFrame(() => {
    initFormCharCounter();
    initFormSelect();
  });
}

document.addEventListener('componentsLoaded', initForm);

if (document.readyState === 'complete' || document.readyState === 'interactive')
  setTimeout(initForm, 100);
