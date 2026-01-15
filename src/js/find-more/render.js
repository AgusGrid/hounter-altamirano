/**
 * Generates the HTML for a left item
 * @param {Object} item - Object with item data
 * @returns {string} Left item HTML
 */
function renderLeftItem(item) {
  return `
    <div class="find-more__container-content-left-item" data-item-id="${item.id}">
      <div class="find-more__container-content-left-item-image">
        <img src="${item.image}" alt="Find More Image" />
      </div>

      <div class="find-more__container-content-left-item-text">
        <div class="find-more__container-content-left-item-text-author">
          <img src="${item.author.avatar}" alt="Author Image" />
          <p class="label--regular">${item.author.name}</p>
        </div>

        <a href="#" class="subtitle find-more__container-content-left-item-text-title find-more__title-link" data-item-id="${item.id}">
          ${item.title}
        </a>

        <div class="find-more__container-content-left-item-text-time">
          <img src="./assets/icons/shapes/clock.svg" alt="Clock Icon" />
          <p class="label--regular">${item.readTime} | ${item.date}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates the HTML for the right item
 * @param {Object} item - Object with item data
 * @returns {string} Right item HTML
 */
function renderRightItem(item) {
  return `
    <div class="find-more__container-content-right-item">
      <div class="find-more__container-content-right-item-image">
        <img src="${item.image}" alt="Find More Image" />
      </div>
      <div class="find-more__container-content-right-item-text">
        <div class="find-more__container-content-right-item-text-author">
          <img src="${item.author.avatar}" alt="Author Image" />
          <p class="label--regular">${item.author.name}</p>
        </div>

        <h3 class="heading-3 find-more__container-content-right-item-text-title">
          ${item.title}
        </h3>

        <p class="body-text body-text--light find-more__container-content-right-item-text-content">
          ${item.content}
        </p>

        <div class="find-more__container-content-right-item-text-time">
          <img src="./assets/icons/shapes/clock.svg" alt="Clock Icon" />
          <p class="label--regular">${item.readTime} | ${item.date}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders all find more items in their containers
 * @param {Object} data - Object with leftItems and rightItem
 */
function renderFindMoreItems(data) {
  if (!data) return;

  const leftContainer = document.querySelector(
    '.find-more__container-content-left'
  );
  const rightContainer = document.querySelector(
    '.find-more__container-content-right'
  );

  if (leftContainer && data.leftItems) {
    leftContainer.innerHTML = data.leftItems.map(renderLeftItem).join('');
  }

  if (rightContainer && data.rightItem) {
    rightContainer.innerHTML = renderRightItem(data.rightItem);
  }
}

/**
 * Updates only the right container with a new item
 * @param {Object} item - Item to display in right container
 */
function updateRightItem(item) {
  if (!item) return;

  const rightContainer = document.querySelector(
    '.find-more__container-content-right'
  );

  if (rightContainer) {
    rightContainer.innerHTML = renderRightItem(item);
  }
}

// Export functions to global scope
window.FindMoreRender = {
  renderLeftItem,
  renderRightItem,
  renderFindMoreItems,
  updateRightItem,
};
