function initCustomSelect() {
  const selectTriggers = document.querySelectorAll('.select-trigger');

  selectTriggers.forEach((trigger) => {
    const select = trigger.closest('.custom-select');
    const list = select.querySelector('.select-list');
    const valueEl = select.querySelector('.select-value, .value'); 

    trigger.addEventListener('click', () => {
      document.querySelectorAll('.custom-select.open').forEach((openSelect) => {
        if (openSelect !== select) {
          openSelect.classList.remove('open');
          openSelect
            .querySelector('.select-trigger')
            .setAttribute('aria-expanded', 'false');
        }
      });

      select.classList.toggle('open');
      const expanded = select.classList.contains('open');
      trigger.setAttribute('aria-expanded', expanded);
    });

    list.querySelectorAll('li').forEach((option) => {
      option.addEventListener('click', () => {
        const text = option.textContent.trim();
        if (valueEl) valueEl.textContent = text;
        if (option.dataset.value !== undefined) {
          select.dataset.value = option.dataset.value;
        }

        list
          .querySelectorAll('li')
          .forEach((li) => li.classList.remove('selected'));
        option.classList.add('selected');

        select.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      });
    });
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.custom-select.open').forEach((select) => {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
        select
          .querySelector('.select-trigger')
          .setAttribute('aria-expanded', 'false');
      }
    });
  });
}
