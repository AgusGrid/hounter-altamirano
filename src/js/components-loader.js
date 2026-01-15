/**
 * Component Loader
 * Carga componentes HTML dinamicamente en los contenedores especificados
 */

/**
 * Carga un componente HTML y lo inserta en el contenedor especificado
 * @param {string} componentPath - Ruta al archivo HTML del componente
 * @param {string} containerId - ID del contenedor donde se inserta el componente
 */
async function loadComponent(componentPath, containerId) {
  try {
    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(
        `Error al cargar ${componentPath}: ${response.statusText}`
      );
    }

    const html = await response.text();
    const container = document.getElementById(containerId);

    if (!container) {
      throw new Error(`Contenedor con ID "${containerId}" no encontrado`);
    }

    container.innerHTML = html;
  } catch (error) {
    console.error(`Error cargando componente ${componentPath}:`, error);
  }
}

/**
 * Carga todos los componentes de la app
 */
async function loadAllComponents() {
  const components = [
    { path: 'components/header.html', container: 'header-container' },
    { path: 'components/hero.html', container: 'hero-container' },
    {
      path: 'components/featured-house.html',
      container: 'featured-house-container',
    },
    { path: 'components/tour.html', container: 'tour-container' },
    {
      path: 'components/find-more.html',
      container: 'find-more-container',
      path: 'components/testimonials.html',
      container: 'testimonials-container',
    },
  ];

  await Promise.all(
    components.map((comp) => loadComponent(comp.path, comp.container))
  );

  // Dispara un evento personalizado cuando todos los componentes estan cargados
  document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', loadAllComponents);
else loadAllComponents();
