// Reset Postural — LP scripts mínimos
(function () {
  'use strict';

  // Sticky CTA mobile — aparece quando passa do hero
  const stickyCta = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero');

  if (stickyCta && hero) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stickyCta.classList.remove('visible');
          } else {
            stickyCta.classList.add('visible');
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  }

  // Smooth scroll com offset (em caso de header sticky futuro)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Fecha um <details> de FAQ/objeções quando outro abre (acordeón)
  const groups = [
    document.querySelectorAll('.faq-item'),
    document.querySelectorAll('.obj-item'),
  ];
  groups.forEach((group) => {
    group.forEach((item) => {
      item.addEventListener('toggle', function () {
        if (this.open) {
          group.forEach((other) => {
            if (other !== this && other.open) other.open = false;
          });
        }
      });
    });
  });

  // Telemetria simples (placeholder pra futura integração analytics)
  document.querySelectorAll('.cta').forEach((cta) => {
    cta.addEventListener('click', () => {
      const id = cta.id || 'unknown';
      console.log('[CTA click]', id, new Date().toISOString());
      // window.dataLayer && window.dataLayer.push({event:'cta_click', id});
    });
  });
})();
