/**
 * Initializes the testimonials system
 */
async function initTestimonials() {
  if (!window.TestimonialsData) {
    console.error('TestimonialsData module not loaded');
    return;
  }

  const testimonials = await window.TestimonialsData.loadTestimonials();
  window.TestimonialsData.setAllTestimonials(testimonials);

  if (window.TestimonialsRender)
    window.TestimonialsRender.renderTestimonials(testimonials);
}

document.addEventListener('componentsLoaded', async () => {
  await initTestimonials();
});
