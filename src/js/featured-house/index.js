// Featured House - Main Initialization
/**
 * Initializes the properties system
 */
async function initProperties() {
  if (!window.FeaturedHouseData) {
    console.error('FeaturedHouseData module not loaded');
    return;
  }

  const properties = await window.FeaturedHouseData.loadProperties();
  window.FeaturedHouseData.setAllProperties(properties);

  if (window.FeaturedHouseFilters) {
    window.FeaturedHouseFilters.filterPropertiesByType(null);
  }
}

document.addEventListener('componentsLoaded', async () => {
  await initProperties();

  // Featured House - Filters with toggle functionality
  const filterButtons = document.querySelectorAll(
    '.featured-house__filters button'
  );

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isCurrentlyActive = btn.classList.contains(
        'featured-house__filters-active'
      );

      if (isCurrentlyActive) {
        // If button is already active, deactivate it and show all properties
        filterButtons.forEach((b) => {
          b.classList.remove(
            'featured-house__filters-active',
            'btn--soft-full'
          );
          b.classList.add('btn--base');
        });
        if (window.FeaturedHouseFilters) {
          window.FeaturedHouseFilters.filterPropertiesByType(null);
        }
      } else {
        // If button is not active, activate it and filter
        filterButtons.forEach((b) => {
          b.classList.remove(
            'featured-house__filters-active',
            'btn--soft-full'
          );
          b.classList.add('btn--base');
        });
        btn.classList.add('featured-house__filters-active', 'btn--soft-full');
        btn.classList.remove('btn--base');

        const buttonText = btn.querySelector('span').textContent.toLowerCase();
        const typeMap = {
          house: 'house',
          villa: 'villa',
          apartment: 'apartment',
        };
        const type = typeMap[buttonText];
        if (type && window.FeaturedHouseFilters) {
          window.FeaturedHouseFilters.filterPropertiesByType(type);
        }
      }
    });
  });

  // Featured House - Navigation Buttons (carousel)
  const prevBtn = document.querySelector(
    '.featured-house__nav-btn[data-direction="prev"]'
  );
  const nextBtn = document.querySelector(
    '.featured-house__nav-btn[data-direction="next"]'
  );

  if (prevBtn && window.FeaturedHouseCarousel) {
    prevBtn.addEventListener('click', () =>
      window.FeaturedHouseCarousel.scrollCarousel('prev')
    );
  }

  if (nextBtn && window.FeaturedHouseCarousel) {
    nextBtn.addEventListener('click', () =>
      window.FeaturedHouseCarousel.scrollCarousel('next')
    );
  }

  // Listener to update buttons when scrolling
  const container = document.querySelector('.featured-house__cards-container');
  if (container && window.FeaturedHouseCarousel) {
    container.addEventListener('scroll', () =>
      window.FeaturedHouseCarousel.updateCarouselButtons()
    );
  }

  // Listener to recalculate when window size changes
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.FeaturedHouseCarousel) {
        window.FeaturedHouseCarousel.checkCarouselNeeded();
        window.FeaturedHouseCarousel.updateCarouselButtons();
      }
    }, 150);
  });
});
