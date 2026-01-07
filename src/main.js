function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuClose = document.querySelector('.mobile-menu__close');
  const menuOverlay = document.querySelector('.mobile-menu__overlay');

  if (!menuToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  menuOverlay?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof initCustomSelect === 'function') {
      initCustomSelect();
    }
    initMobileMenu();
  });
} else {
  if (typeof initCustomSelect === 'function') {
    initCustomSelect();
  }
  initMobileMenu();
}
