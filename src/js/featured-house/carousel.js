// Featured House - Carousel
/**
 * Checks if carousel is needed
 * @returns {boolean} true if carousel is needed
 */
function checkCarouselNeeded() {
  const container = document.querySelector('.featured-house__cards-container');
  if (!container) return false;

  const cards = container.querySelectorAll('.property-card');

  // If there are less than 2 cards, carousel is not needed
  if (cards.length <= 1) return false;

  // Check if there is overflow by comparing scrollWidth with clientWidth
  return container.scrollWidth > container.clientWidth;
}

/**
 * Updates the state of carousel navigation buttons
 */
function updateCarouselButtons() {
  const container = document.querySelector('.featured-house__cards-container');
  const prevBtn = document.querySelector(
    '.featured-house__nav-btn[data-direction="prev"]'
  );
  const nextBtn = document.querySelector(
    '.featured-house__nav-btn[data-direction="next"]'
  );

  if (!container || !prevBtn || !nextBtn) return;

  const isCarouselNeeded = checkCarouselNeeded();

  if (isCarouselNeeded) {
    prevBtn.classList.remove('featured-house__nav-btn--hidden');
    nextBtn.classList.remove('featured-house__nav-btn--hidden');

    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd =
      container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;

    if (isAtStart) {
      prevBtn.classList.remove(
        'btn--filled',
        'btn--dark',
        'featured-house__nav-btn--active'
      );
      prevBtn.classList.add('btn--outlined', 'btn--base');
      prevBtn.disabled = true;
    } else {
      prevBtn.classList.add(
        'btn--filled',
        'btn--dark',
        'featured-house__nav-btn--active'
      );
      prevBtn.classList.remove('btn--outlined', 'btn--base');
      prevBtn.disabled = false;
    }

    if (isAtEnd) {
      nextBtn.classList.remove(
        'btn--filled',
        'btn--dark',
        'featured-house__nav-btn--active'
      );
      nextBtn.classList.add('btn--outlined', 'btn--base');
      nextBtn.disabled = true;
    } else {
      nextBtn.classList.add(
        'btn--filled',
        'btn--dark',
        'featured-house__nav-btn--active'
      );
      nextBtn.classList.remove('btn--outlined', 'btn--base');
      nextBtn.disabled = false;
    }
  } else {
    // Hide buttons if carousel is not needed
    prevBtn.classList.add('featured-house__nav-btn--hidden');
    nextBtn.classList.add('featured-house__nav-btn--hidden');
  }
}

/**
 * Scrolls the carousel in the specified direction
 * @param {string} direction - Scroll direction ('prev' or 'next')
 */
function scrollCarousel(direction) {
  const container = document.querySelector('.featured-house__cards-container');
  if (!container) return;

  const cards = container.querySelectorAll('.property-card');
  if (cards.length === 0) return;

  // Get the width of a card (including gap)
  const firstCard = cards[0];
  const cardWidth = firstCard.offsetWidth;
  const gap = 32; // 2rem = 32px (container gap)
  const scrollAmount = cardWidth + gap;

  const currentScroll = container.scrollLeft;
  const newScroll =
    direction === 'next'
      ? currentScroll + scrollAmount
      : currentScroll - scrollAmount;

  container.scrollTo({
    left: newScroll,
    behavior: 'smooth',
  });
}

// Export functions to global scope
window.FeaturedHouseCarousel = {
  checkCarouselNeeded,
  updateCarouselButtons,
  scrollCarousel,
};
