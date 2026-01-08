// Custom Select - Event Handlers
/**
 * Handles click on select trigger
 * @param {HTMLElement} trigger - The trigger element
 * @param {HTMLElement} select - The select container
 */
function handleTriggerClick(trigger, select) {
  // Close other open selects
  document.querySelectorAll('.custom-select.open').forEach((openSelect) => {
    if (openSelect !== select) {
      openSelect.classList.remove('open');
      openSelect
        .querySelector('.select-trigger')
        .setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle current select
  select.classList.toggle('open');
  const expanded = select.classList.contains('open');
  trigger.setAttribute('aria-expanded', expanded);
}

/**
 * Handles click on option
 * @param {HTMLElement} option - The option element
 * @param {HTMLElement} select - The select container
 * @param {HTMLElement} list - The options list
 * @param {HTMLElement} valueEl - The value display element
 * @param {HTMLElement} trigger - The trigger element
 */
function handleOptionClick(option, select, list, valueEl, trigger) {
  const text = option.textContent.trim();
  if (valueEl) valueEl.textContent = text;
  if (option.dataset.value !== undefined) {
    select.dataset.value = option.dataset.value;
  }

  // Remove selected class from all options
  list.querySelectorAll('li').forEach((li) => li.classList.remove('selected'));
  option.classList.add('selected');

  // Close select
  select.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.focus();
}

/**
 * Handles click outside to close open selects
 * @param {Event} e - Click event
 */
function handleOutsideClick(e) {
  document.querySelectorAll('.custom-select.open').forEach((select) => {
    if (!select.contains(e.target)) {
      select.classList.remove('open');
      select
        .querySelector('.select-trigger')
        .setAttribute('aria-expanded', 'false');
    }
  });
}

// Export functions to global scope
window.CustomSelectHandlers = {
  handleTriggerClick,
  handleOptionClick,
  handleOutsideClick,
};
