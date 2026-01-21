/**
 * Generates the HTML for a testimonial item
 * @param {Object} testimonial - Object with testimonial data
 * @returns {string} Testimonial item HTML
 */
function renderTestimonialItem(testimonial, index) {
  return `
    <div class="testimonials__item ${index === 0 ? 'testimonials__item--active' : ''}">
      <div class="testimonials__background">
        <img src="${testimonial.backgroundImage}" alt="Background house" class="testimonials__background-image" />
      </div>
      <div class="testimonials__container-content-item">
        <div class="testimonials__container-content-item-header">
          <h3 class="heading-3 testimonials__container-content-item-title">
            ${testimonial.title}
          </h3>
        </div>
        <div class="testimonials__container-content-item-body">
          <p class="body-text testimonials__container-content-item-text">
            ${testimonial.text}
          </p>
        </div>
        <div class="testimonials__container-content-item-footer">
          <div class="property-card__agent testimonials__agent">
            <img
              src="${testimonial.agent.avatar}"
              alt="${testimonial.agent.name} avatar"
              class="property-card__agent-avatar testimonials__agent-avatar"
            />
            <div class="property-card__agent-info testimonials__agent-info">
              <p class="property-card__agent-name testimonials__agent-name">
                ${testimonial.agent.name}
              </p>
              <p class="property-card__agent-location testimonials__agent-location">
                ${testimonial.agent.location}
              </p>
            </div>
          </div>
          <div class="testimonials__rating">
            <img src="./assets/icons/shapes/star.svg" alt="Star icon" class="testimonials__rating-star" />
            <span class="heading-4 testimonials__rating-value">${testimonial.rating}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates the HTML for indicators
 * @param {number} count - Number of indicators to generate
 * @returns {string} Indicators HTML
 */
function renderIndicators(count) {
  return `
    <div class="testimonials__indicators">
      ${Array.from(
        { length: count },
        (_, index) => `
        <button 
          class="testimonials__indicator ${index === 0 ? 'testimonials__indicator--active' : ''}"
          aria-label="Go to testimonial ${index + 1}"
          data-index="${index}"
        ></button>
      `
      ).join('')}
    </div>
  `;
}

/**
 * Renders testimonials in the container
 * @param {Array} testimonials - Array of testimonials to render
 */
function renderTestimonials(testimonials) {
  const container = document.querySelector('.testimonials__container-content');
  if (!container) return;

  if (testimonials.length === 0) {
    container.innerHTML = '<p>No hay testimonios disponibles.</p>';
    return;
  }

  if (window.TestimonialsSlider) {
    window.TestimonialsSlider.resetSlider();
  }

  container.innerHTML = testimonials
    .map((testimonial, index) => renderTestimonialItem(testimonial, index))
    .join('');

  const indicatorsContainer = container.parentElement;
  if (indicatorsContainer) {
    const existingIndicators = indicatorsContainer.querySelector(
      '.testimonials__indicators'
    );
    if (existingIndicators) {
      existingIndicators.remove();
    }

    const indicatorsHTML = renderIndicators(testimonials.length);
    indicatorsContainer.insertAdjacentHTML('beforeend', indicatorsHTML);

    const indicators = indicatorsContainer.querySelectorAll(
      '.testimonials__indicator'
    );
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        if (window.TestimonialsSlider) {
          window.TestimonialsSlider.showTestimonial(index);
        }
      });
    });
  }

  setTimeout(() => {
    if (window.TestimonialsSlider) window.TestimonialsSlider.initSlider();
    else console.warn('TestimonialsSlider not available');
  }, 200);
}

window.TestimonialsRender = {
  renderTestimonialItem,
  renderTestimonials,
  renderIndicators,
};
