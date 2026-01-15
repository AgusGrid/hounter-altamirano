let autoPlayInterval = null;
let isAutoPlaying = false;
let currentIndex = 0;
const AUTO_PLAY_DELAY = 5000; // 5 segundos entre cambios

/**
 * Gets the current active testimonial index
 * @returns {number} Current index
 */
function getCurrentIndex() {
  const container = document.querySelector('.testimonials__container-content');
  if (!container) return 0;

  const items = container.querySelectorAll('.testimonials__item');
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains('testimonials__item--active')) {
      return i;
    }
  }
  return 0;
}

/**
 * Shows the next testimonial (adelante)
 */
function showNextTestimonial() {
  const container = document.querySelector('.testimonials__container-content');
  if (!container) return;

  const items = container.querySelectorAll('.testimonials__item');
  if (items.length === 0) return;

  const nextIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
  showTestimonial(nextIndex);
}

/**
 * Shows the previous testimonial (atrás)
 */
function showPreviousTestimonial() {
  const container = document.querySelector('.testimonials__container-content');
  if (!container) return;

  const items = container.querySelectorAll('.testimonials__item');
  if (items.length === 0) return;

  const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
  showTestimonial(prevIndex);
}

/**
 * Shows a specific testimonial by index and hides others
 * @param {number} index - Index of the testimonial to show
 */
function showTestimonial(index) {
  const container = document.querySelector('.testimonials__container-content');
  if (!container) return;

  const items = container.querySelectorAll('.testimonials__item');
  if (items.length === 0 || index < 0 || index >= items.length) return;

  items.forEach((item) => {
    item.classList.remove('testimonials__item--active');
  });

  items[index].classList.add('testimonials__item--active');

  currentIndex = index;

  updateActiveIndicator(index);
}

/**
 * Updates the active indicator dot
 * @param {number} activeIndex - Index of the active testimonial
 */
function updateActiveIndicator(activeIndex) {
  const indicators = document.querySelectorAll('.testimonials__indicator');
  indicators.forEach((indicator, index) => {
    if (index === activeIndex) {
      indicator.classList.add('testimonials__indicator--active');
    } else {
      indicator.classList.remove('testimonials__indicator--active');
    }
  });
}

/**
 * Starts the auto-play functionality
 */
function startAutoPlay() {
  const container = document.querySelector('.testimonials__container-content');
  if (!container) return;

  const items = container.querySelectorAll('.testimonials__item');
  if (items.length <= 1 || isAutoPlaying) return;

  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }

  autoPlayInterval = setInterval(() => {
    showNextTestimonial();
  }, AUTO_PLAY_DELAY);

  isAutoPlaying = true;
}

/**
 * Stops the auto-play functionality
 */
function stopAutoPlay() {
  if (!isAutoPlaying) return;
  isAutoPlaying = false;
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

let isSliderInitialized = false;

/**
 * Initializes the slider
 */
function initSlider() {
  const container = document.querySelector('.testimonials__container-content');
  if (!container) {
    console.warn('Testimonials container not found');
    return;
  }

  const items = container.querySelectorAll('.testimonials__item');
  if (items.length === 0) {
    console.warn('No testimonial items found');
    return;
  }

  if (isSliderInitialized) {
    return;
  }

  requestAnimationFrame(() => {
    showTestimonial(0);
    currentIndex = 0;

    if (items.length > 1) {
      setTimeout(() => {
        startAutoPlay();
      }, 500);
    }

    isSliderInitialized = true;
  });

  const sliderSection = container.closest('.testimonials');
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', () => {
      stopAutoPlay();
    });

    sliderSection.addEventListener('mouseleave', () => {
      if (items.length > 1) {
        startAutoPlay();
      }
    });
  }

  const indicators = document.querySelectorAll('.testimonials__indicator');
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      stopAutoPlay();

      setTimeout(() => {
        if (items.length > 1) {
          startAutoPlay();
        }
      }, AUTO_PLAY_DELAY);
    });
  });

  // Navigation with keyboard (left and right arrows)
  let keyboardTimeout;
  document.addEventListener('keydown', (e) => {
    const sliderSection = container.closest('.testimonials');
    if (!sliderSection) return;

    const rect = sliderSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (!isVisible) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();

      showNextTestimonial();
      stopAutoPlay();

      clearTimeout(keyboardTimeout);
      keyboardTimeout = setTimeout(() => {
        if (items.length > 1) {
          startAutoPlay();
        }
      }, AUTO_PLAY_DELAY);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();

      showPreviousTestimonial();
      stopAutoPlay();

      clearTimeout(keyboardTimeout);
      keyboardTimeout = setTimeout(() => {
        if (items.length > 1) {
          startAutoPlay();
        }
      }, AUTO_PLAY_DELAY);
    }
  });
}

/**
 * Resets the slider initialization flag (useful for re-rendering)
 */
function resetSlider() {
  isSliderInitialized = false;
  stopAutoPlay();
  currentIndex = 0;
}

window.TestimonialsSlider = {
  showTestimonial,
  showNextTestimonial,
  showPreviousTestimonial,
  updateActiveIndicator,
  initSlider,
  resetSlider,
  startAutoPlay,
  stopAutoPlay,
};
