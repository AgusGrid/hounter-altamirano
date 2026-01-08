// Featured House - Rendering
/**
 * Generates the HTML for a property card
 * @param {Object} property - Object with property data
 * @returns {string} Card HTML
 */
function renderPropertyCard(property) {
  return `
    <div class="property-card">
      <div class="property-card__image-wrapper">
        <img
          src="${property.image}"
          alt="${property.title}"
          class="property-card__image"
        />
        <span class="label label--${property.label.type}">${property.label.text}</span>
      </div>

      <div class="property-card__content">
        <h3 class="property-card__title">${property.title}</h3>
        <p class="property-card__price heading-4">${property.price}</p>

        <div class="property-card__agent">
          <img
            src="${property.agent.avatar}"
            alt="${property.agent.name}"
            class="property-card__agent-avatar"
          />
          <div class="property-card__agent-info">
            <p class="property-card__agent-name">${property.agent.name}</p>
            <p class="property-card__agent-location">${property.agent.location}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders properties in the container
 * @param {Array} properties - Array of properties to render
 */
function renderProperties(properties) {
  const container = document.querySelector('.featured-house__cards-container');
  if (!container) return;

  if (properties.length === 0) {
    container.innerHTML =
      '<p>No hay propiedades disponibles para este filtro.</p>';
    if (window.FeaturedHouseCarousel) {
      window.FeaturedHouseCarousel.updateCarouselButtons();
    }
    return;
  }

  container.innerHTML = properties.map(renderPropertyCard).join('');

  // Recalculate carousel after rendering
  setTimeout(() => {
    if (window.FeaturedHouseCarousel) {
      window.FeaturedHouseCarousel.checkCarouselNeeded();
      window.FeaturedHouseCarousel.updateCarouselButtons();
    }
  }, 0);
}

// Export functions to global scope
window.FeaturedHouseRender = {
  renderPropertyCard,
  renderProperties,
};
