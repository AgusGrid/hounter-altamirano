/**
 * Initializes the testimonials system
 */
async function initTestimonials() {
  if (!window.TestimonialsData) {
    console.error('TestimonialsData module not loaded');
    return;
  }

  const container = document.querySelector('.testimonials__container-content');
  if (!container) {
    console.warn('Testimonials container not found, retrying...');
    setTimeout(initTestimonials, 100);
    return;
  }

  const testimonials = await window.TestimonialsData.loadTestimonials();
  if (testimonials.length === 0) {
    console.warn('No testimonials loaded');
    return;
  }

  window.TestimonialsData.setAllTestimonials(testimonials);

  if (window.TestimonialsRender)
    window.TestimonialsRender.renderTestimonials(testimonials);
}

document.addEventListener('componentsLoaded', async () => {
  await initTestimonials();
});
