/**
 * Cookie Banner Handler
 * Maneja la funcionalidad del banner de cookies
 */

function initCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieCloseBtn = document.getElementById('cookie-close');

  if (!cookieBanner || !cookieCloseBtn) {
    return;
  }

  const cookieConsent = localStorage.getItem('cookieConsent');

  if (cookieConsent === 'accepted') {
    cookieBanner.setAttribute('aria-hidden', 'true');
    return;
  }

  cookieBanner.setAttribute('aria-hidden', 'false');
  cookieCloseBtn.addEventListener('click', handleCookieClose);
}

function handleCookieClose(e) {
  e.preventDefault();
  e.stopPropagation();

  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    cookieBanner.setAttribute('aria-hidden', 'true');
    localStorage.setItem('cookieConsent', 'accepted');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('componentsLoaded', initCookieBanner);
    initCookieBanner();
  });
} else {
  document.addEventListener('componentsLoaded', initCookieBanner);
  initCookieBanner();
}

/**
 * Reset Cookie Banner (development/testing)
 * can call it from the console: resetCookieBanner()
 */
window.resetCookieBanner = function () {
  localStorage.removeItem('cookieConsent');
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    cookieBanner.setAttribute('aria-hidden', 'false');
  }
  console.log(
    'Banner de cookies reseteado. Recarga la página para verlo de nuevo.'
  );
};
