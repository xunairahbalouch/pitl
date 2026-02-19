// Pakistan to Ivy League — Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initMapInteractivity();
  initCrestTooltips();
  initCardStagger();
});

// Mobile navigation toggle
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Scroll-triggered reveal animations
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// Interactive Pakistan map — region hover with tooltip
function initMapInteractivity() {
  const mapPaths = document.querySelectorAll('.map-path');
  let tooltip = document.querySelector('.map-tooltip');
  
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    document.body.appendChild(tooltip);
  }

  const regionNames = {
    'map-kashmir': 'Kashmir',
    'map-punjab': 'Punjab',
    'map-sindh': 'Sindh',
    'map-balochistan': 'Balochistan',
    'map-kpk': 'Khyber Pakhtunkhwa'
  };

  mapPaths.forEach(path => {
    if (path.classList.contains('map-outline')) return;
    if (path.classList.contains('map-kashmir') || 
        path.classList.contains('map-punjab') ||
        path.classList.contains('map-sindh') ||
        path.classList.contains('map-balochistan') ||
        path.classList.contains('map-kpk')) {
      path.style.cursor = 'pointer';
      path.style.fill = 'rgba(74, 93, 60, 0.05)';

      path.addEventListener('mouseenter', (e) => {
        const name = regionNames[path.classList[1]] || 'Pakistan';
        tooltip.textContent = name;
        tooltip.classList.add('visible');
        path.style.fill = 'rgba(74, 93, 60, 0.2)';
      });

      path.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.clientX}px`;
        tooltip.style.top = `${e.clientY}px`;
      });

      path.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
        path.style.fill = 'rgba(74, 93, 60, 0.05)';
      });
    }
  });
}

// Staggered card reveal
function initCardStagger() {
  document.querySelectorAll('.cards-grid .card.reveal').forEach((card, i) => {
    card.style.setProperty('--i', i);
  });
}

// Ivy League crest hover — show university name
function initCrestTooltips() {
  const crests = document.querySelectorAll('.crest');
  crests.forEach(crest => {
    crest.addEventListener('click', () => {
      const uni = crest.getAttribute('data-university');
      const names = {
        harvard: 'Harvard University',
        yale: 'Yale University',
        princeton: 'Princeton University',
        columbia: 'Columbia University'
      };
      // Could open a modal or navigate — for now, subtle pulse
      crest.style.animation = 'pulse 0.5s ease';
      setTimeout(() => crest.style.animation = '', 500);
    });
  });
}
