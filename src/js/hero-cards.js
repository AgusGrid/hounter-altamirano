/**
 * Hero Cards Loader
 */

async function loadHeroCards() {
  try {
    const response = await fetch('./data/hero-cards.json');

    if (!response.ok) {
      throw new Error(
        `Error al cargar hero-cards.json: ${response.statusText}`
      );
    }

    const cards = await response.json();
    const marquee = document.querySelector('.card-container__marquee');

    if (!marquee) {
      console.warn('No se encontroó el contenedor .card-container__marquee');
      return;
    }

    marquee.innerHTML = '';

    cards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';

      const avatarContainer = document.createElement('div');

      if (card.type === 'group') {
        avatarContainer.className = 'card-avatar-group';
        card.avatars.forEach((avatarSrc) => {
          const img = document.createElement('img');
          img.src = avatarSrc;
          img.alt = 'Avatar image';
          img.className = 'card-img';
          avatarContainer.appendChild(img);
        });
      } else {
        avatarContainer.className = 'card-avatar';
        const img = document.createElement('img');
        img.src = card.avatars[0];
        img.alt = 'Avatar image';
        img.className = 'card-img';
        avatarContainer.appendChild(img);
      }

      const textWrapper = document.createElement('div');
      textWrapper.className = 'card-text-wrapper';

      const title = document.createElement('p');
      title.className = 'card-text body-text--semibold';
      title.textContent = card.title;

      const subtitle = document.createElement('p');
      subtitle.className = 'card-text label--small';
      subtitle.textContent = card.subtitle;

      textWrapper.appendChild(title);
      textWrapper.appendChild(subtitle);

      cardElement.appendChild(avatarContainer);
      cardElement.appendChild(textWrapper);

      marquee.appendChild(cardElement);
    });
  } catch (error) {
    console.error('Error cargando las cards del hero:', error);
  }
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', loadHeroCards);
else loadHeroCards();

document.addEventListener('componentsLoaded', loadHeroCards);
