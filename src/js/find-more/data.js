let findMoreData = null;

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

window.FindMoreData = {
  loadFindMoreData,
  getFindMoreData,
  setFindMoreData,
  moveItemToRight,
};
