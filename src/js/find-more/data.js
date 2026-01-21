let findMoreData = null;
let isShowingMoreArticles = false;
let originalData = null;

/**
 * Loads find more articles from JSON file
 * @returns {Promise<Object|null>} Object with leftItems and rightItem or null
 */
async function loadFindMoreData() {
  try {
    const response = await fetch('./data/find-more.json');
    if (!response.ok) {
      throw new Error(`Error loading find more data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading find more data:', error);
    return null;
  }
}

/**
 * Gets all find more data
 * @returns {Object|null} Find more data object or null
 */
function getFindMoreData() {
  return findMoreData;
}

/**
 * Sets find more data
 * @param {Object} data - Find more data object
 */
function setFindMoreData(data) {
  findMoreData = data;
  originalData = JSON.parse(JSON.stringify(data)); // Deep copy for original data
}

/**
 * Moves an item from leftItems to rightItem by ID
 * @param {number} itemId - ID of the item to move
 * @returns {Object|null} The moved item or null if not found
 */
function moveItemToRight(itemId) {
  if (!findMoreData || !findMoreData.leftItems) {
    return null;
  }

  const itemIndex = findMoreData.leftItems.findIndex(
    (item) => item.id === itemId
  );

  if (itemIndex === -1) {
    return null;
  }

  const item = findMoreData.leftItems[itemIndex];
  findMoreData.rightItem = item;

  return item;
}

/**
 * Toggles between original articles and more articles
 * @returns {Object|null} Current data object or null
 */
function toggleMoreArticles() {
  if (!findMoreData || !originalData) {
    return null;
  }

  if (isShowingMoreArticles) {
    // Switch back to original articles
    findMoreData.leftItems = JSON.parse(JSON.stringify(originalData.leftItems));
    findMoreData.rightItem = JSON.parse(JSON.stringify(originalData.rightItem));
    isShowingMoreArticles = false;
  } else {
    // Switch to more articles
    if (originalData.moreArticles) {
      findMoreData.leftItems = JSON.parse(
        JSON.stringify(originalData.moreArticles.leftItems)
      );
      findMoreData.rightItem = JSON.parse(
        JSON.stringify(originalData.moreArticles.rightItem)
      );
      isShowingMoreArticles = true;
    }
  }

  return findMoreData;
}

/**
 * Gets current state of articles (original or more)
 * @returns {boolean} True if showing more articles, false if showing original
 */
function getIsShowingMoreArticles() {
  return isShowingMoreArticles;
}

window.FindMoreData = {
  loadFindMoreData,
  getFindMoreData,
  setFindMoreData,
  moveItemToRight,
  toggleMoreArticles,
  getIsShowingMoreArticles,
};
