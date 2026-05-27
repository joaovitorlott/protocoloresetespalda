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

  // Reveal on scroll — aciona .in quando entra na viewport
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('in'));
    } else {
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => revealObs.observe(el));
    }
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

  // Interatividade do Diagrama da Cadeia Causal
  const diagramSteps = document.querySelectorAll('.diagram-step');
  diagramSteps.forEach((step) => {
    step.addEventListener('click', () => {
      diagramSteps.forEach((s) => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
})();
