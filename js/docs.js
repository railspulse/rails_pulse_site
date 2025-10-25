// Documentation JavaScript

function initDocsNavigation() {
  // Highlight active page in sidebar
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.docs-nav-link');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath ||
        (currentPath.endsWith('/') && linkPath === currentPath + 'installation.html') ||
        (currentPath.includes('/docs') && currentPath.endsWith('/') && linkPath.includes('installation.html'))) {
      link.classList.add('active');
    }
  });
}

function initMobileSidebar() {
  const toggle = document.querySelector('[data-docs-sidebar-toggle]');
  const sidebar = document.querySelector('[data-docs-sidebar]');

  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (event) => {
    if (!toggle.contains(event.target) && !sidebar.contains(event.target)) {
      sidebar.classList.remove('open');
      toggle.classList.remove('active');
    }
  });

  // Close sidebar when clicking a link (mobile)
  const navLinks = sidebar.querySelectorAll('.docs-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1056) {
        sidebar.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  });
}

function initSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 120; // Account for sticky header
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDocsNavigation();
  initMobileSidebar();
  initSmoothScrolling();
});
