let allTestimonials = [];

/**
 * Loads testimonials from JSON file
 * @returns {Promise<Array>} Array of testimonials
 */
async function loadTestimonials() {
  try {
    const response = await fetch('./data/testimonials.json');
    if (!response.ok) {
      throw new Error(`Error al cargar testimonios: ${response.statusText}`);
    }
    const testimonials = await response.json();
    return testimonials;
  } catch (error) {
    console.error('Error cargando testimonios:', error);
    return [];
  }
}

/**
 * Gets all testimonials
 * @returns {Array} All testimonials
 */
function getAllTestimonials() {
  return allTestimonials;
}

/**
 * Sets all testimonials
 * @param {Array} testimonials - Testimonials array
 */
function setAllTestimonials(testimonials) {
  allTestimonials = testimonials;
}

window.TestimonialsData = {
  loadTestimonials,
  getAllTestimonials,
  setAllTestimonials,
};
