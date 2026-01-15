// Custom Select - Main Initialization
/**
 * Initializes custom select components
 */
function initCustomSelect() {
  if (!window.CustomSelectHandlers) {
    console.error('CustomSelectHandlers module not loaded');
    return;
  }

  const selectTriggers = document.querySelectorAll('.select-trigger');

  if (selectTriggers.length === 0) return;

  selectTriggers.forEach((trigger) => {
    const select = trigger.closest('.custom-select');
    const list = select.querySelector('.select-list');
    const valueEl = select.querySelector('.select-value, .value');

    // Add trigger click handler
    trigger.addEventListener('click', () => {
      window.CustomSelectHandlers.handleTriggerClick(trigger, select);
    });

    // Add option click handlers
    list.querySelectorAll('li').forEach((option) => {
      option.addEventListener('click', () => {
        window.CustomSelectHandlers.handleOptionClick(
          option,
          select,
          list,
          valueEl,
          trigger
        );
      });
    });
  });

  // Add outside click handler
  document.addEventListener(
    'click',
    window.CustomSelectHandlers.handleOutsideClick
  );
}

// Auto-initialization
document.addEventListener('componentsLoaded', initCustomSelect);

// Initialize if component is already in DOM
if (document.querySelectorAll('.custom-select').length > 0) {
  initCustomSelect();
}
