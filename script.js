/* =============================================
   DANI EKA SAPUTRA — Portfolio Scripts
   ============================================= */

/* ── Scroll-reveal (fade-up) ──────────────────
   Add class "fade-up" to any element in HTML
   to have it animate in when it enters viewport.
   Applied automatically to key sections below.
   ─────────────────────────────────────────── */
function initScrollReveal() {
  const revealTargets = document.querySelectorAll(
    '.project-card, .skill-group, .video-card, .section-header, .footer-inner'
  );

  revealTargets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach(el => observer.observe(el));
}

/* ── Nav: shrink on scroll ────────────────── */
function initNavShrink() {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.height = '52px';
      nav.style.boxShadow = '0 2px 16px rgba(30,58,138,.08)';
    } else {
      nav.style.height = '64px';
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
}

/* ── Smooth nav link highlight ────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = 'var(--blue-600)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ── Video card: keyboard accessible ─────── */
function initVideoCards() {
  const cards = document.querySelectorAll('.video-card');
  cards.forEach(card => {
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.open(card.href, '_blank');
      }
    });
  });
}

/* ── Init all ─────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavShrink();
  initActiveNav();
  initVideoCards();
});