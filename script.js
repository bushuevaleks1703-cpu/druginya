const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -4% 0px' });

reveals.forEach((el) => observer.observe(el));

const hero = document.querySelector('.hero');
const heroPhoto = document.querySelector('.hero-photo');
const heroParallax = [...document.querySelectorAll('.hero-parallax')];
let ticking = false;

function updateHeroParallax() {
  if (!hero || !heroPhoto) return;
  const rect = hero.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, hero.offsetHeight)));

  // Very restrained movement: the composition stays intact, but the type feels alive during scroll.
  heroPhoto.style.transform = `translate3d(0, ${progress * 6}px, 0) scale(1.002)`;

  heroParallax.forEach((el) => {
    const speed = Number(el.dataset.speed || 0);
    const shift = progress * speed * -70;
    el.style.transform = el.classList.contains('hero-cta')
      ? `translate3d(-50%, ${shift}px, 0)`
      : `translate3d(0, ${shift}px, 0)`;
  });
}

function requestHeroUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateHeroParallax();
    ticking = false;
  });
}

window.addEventListener('scroll', requestHeroUpdate, { passive: true });
window.addEventListener('resize', requestHeroUpdate);
updateHeroParallax();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
