// Featured House - Filters
/**
 * Filters properties by type
 * @param {string|null} type - Property type ('house', 'villa', 'apartment') or null for all
 */
function filterPropertiesByType(type) {
  if (window.FeaturedHouseData) {
    window.FeaturedHouseData.setCurrentFilter(type);
    const allProperties = window.FeaturedHouseData.getAllProperties();
    const filtered = type
      ? allProperties.filter((property) => property.type === type)
      : allProperties;

    if (window.FeaturedHouseRender) {
      window.FeaturedHouseRender.renderProperties(filtered);
    }
  }
}

// Export functions to global scope
window.FeaturedHouseFilters = {
  filterPropertiesByType,
};
