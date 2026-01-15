/**
 * Mobile Menu Handler
 * Maneja la funcionalidad del menu hamburguesa en celulares
 */

function initMobileMenu() {
  const burgerBtn = document.querySelector('.burger-menu-btn');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!burgerBtn || !mobileMenuOverlay || !closeBtn) {
    return;
  }

  function openMenu() {
    mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      mobileMenuOverlay.getAttribute('aria-hidden') === 'false'
    ) {
      closeMenu();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (
        window.innerWidth >= 768 &&
        mobileMenuOverlay.getAttribute('aria-hidden') === 'false'
      ) {
        closeMenu();
      }
    }, 250);
  });
}

document.addEventListener('componentsLoaded', initMobileMenu);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}
