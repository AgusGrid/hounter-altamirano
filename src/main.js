document.addEventListener('componentsLoaded', () => {
  if (typeof initCustomSelect === 'function') {
    initCustomSelect();
  }
});

if (document.getElementById('header-container')?.innerHTML) {
  if (typeof initCustomSelect === 'function') {
    initCustomSelect();
  }
}
