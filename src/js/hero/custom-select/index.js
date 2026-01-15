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
    if (trigger.dataset.initialized === 'true') return;

    const select = trigger.closest('.custom-select');
    if (!select) return;

    const list = select.querySelector('.select-list');
    if (!list) return;

    const valueEl = select.querySelector('.select-value, .value');

    if (!list) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      window.CustomSelectHandlers.handleTriggerClick(trigger, select);
    });

    list.querySelectorAll('li').forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        window.CustomSelectHandlers.handleOptionClick(
          option,
          select,
          list,
          valueEl,
          trigger
        );
      });
    });

    // Marcar como inicializado
    trigger.dataset.initialized = 'true';
  });

  // Add outside click handler (solo una vez)
  if (!document.customSelectOutsideHandlerAdded) {
    document.addEventListener(
      'click',
      window.CustomSelectHandlers.handleOutsideClick
    );
    document.customSelectOutsideHandlerAdded = true;
  }

  if (!window.customSelectResizeHandlerAdded) {
    window.addEventListener('resize', () => {
      document.querySelectorAll('.custom-select.open').forEach((select) => {
        const trigger = select.querySelector('.select-trigger');
        const list = select.querySelector('.select-list');
        if (trigger && list) {
          const triggerWidth = trigger.offsetWidth;
          list.style.width = `${triggerWidth}px`;
          list.style.minWidth = `${triggerWidth}px`;
          list.style.maxWidth = `${triggerWidth}px`;
        }
      });
    });
    window.customSelectResizeHandlerAdded = true;
  }
}

// Auto-initialization
document.addEventListener('componentsLoaded', initCustomSelect);

// Initialize if component is already in DOM
if (document.querySelectorAll('.custom-select').length > 0) {
  initCustomSelect();
}
