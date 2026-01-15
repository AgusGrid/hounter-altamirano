/**
 * Initializes the find more articles system
 */
async function initFindMore() {
  if (!window.FindMoreData) {
    console.error('FindMoreData module not loaded');
    return;
  }

  if (!window.FindMoreRender) {
    console.error('FindMoreRender module not loaded');
    return;
  }

  const data = await window.FindMoreData.loadFindMoreData();
  window.FindMoreData.setFindMoreData(data);

  if (data) {
    window.FindMoreRender.renderFindMoreItems(data);
    setupTitleClickHandlers();
  }
}

/**
 * Sets up click handlers for left item titles using event delegation
 */
function setupTitleClickHandlers() {
  const leftContainer = document.querySelector(
    '.find-more__container-content-left'
  );

  if (!leftContainer) return;

  leftContainer.addEventListener('click', (e) => {
    const titleLink = e.target.closest('.find-more__title-link');
    if (!titleLink) return;

    e.preventDefault();
    const itemId = parseInt(titleLink.getAttribute('data-item-id'), 10);

    if (itemId && window.FindMoreData && window.FindMoreRender) {
      const movedItem = window.FindMoreData.moveItemToRight(itemId);

      if (movedItem) {
        window.FindMoreRender.updateRightItem(movedItem);
      }
    }
  });
}

document.addEventListener('componentsLoaded', async () => {
  await initFindMore();
});
