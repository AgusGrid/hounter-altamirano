// Featured House - Data Management
let allProperties = [];
let currentFilter = null;

/**
 * Loads properties from JSON file
 * @returns {Promise<Array>} Array of properties
 */
async function loadProperties() {
  try {
    const response = await fetch('./data/properties.json');
    if (!response.ok) {
      throw new Error(`Error al cargar propiedades: ${response.statusText}`);
    }
    const properties = await response.json();
    return properties;
  } catch (error) {
    console.error('Error cargando propiedades:', error);
    return [];
  }
}

/**
 * Gets all properties
 * @returns {Array} All properties
 */
function getAllProperties() {
  return allProperties;
}

/**
 * Sets all properties
 * @param {Array} properties - Properties array
 */
function setAllProperties(properties) {
  allProperties = properties;
}

/**
 * Gets current filter
 * @returns {string|null} Current filter type or null
 */
function getCurrentFilter() {
  return currentFilter;
}

/**
 * Sets current filter
 * @param {string|null} filter - Filter type or null
 */
function setCurrentFilter(filter) {
  currentFilter = filter;
}

// Export functions to global scope
window.FeaturedHouseData = {
  loadProperties,
  getAllProperties,
  setAllProperties,
  getCurrentFilter,
  setCurrentFilter,
};
