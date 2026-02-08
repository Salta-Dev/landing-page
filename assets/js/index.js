const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
});

if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('header', { y: -20, opacity: 0, duration: 0.8, ease: 'power2.out' });
  gsap.from('.hero-badge', { y: 12, opacity: 0, duration: 0.6, delay: 0.15, ease: 'power2.out' });
  gsap.from('.hero-title', { y: 26, opacity: 0, duration: 0.9, delay: 0.25, ease: 'power3.out' });
  gsap.from('.hero-subtitle', { y: 18, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });

  const sectionBlocks = document.querySelectorAll('section');
  sectionBlocks.forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%'
      },
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (event) => {
      gsap.to(cursorGlow, {
        x: event.clientX,
        y: event.clientY,
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    window.addEventListener('mouseleave', () => {
      gsap.to(cursorGlow, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    });
  }
}

const scrollTopButton = document.getElementById('scrollTop');
const scrollUp = document.getElementById('scrollUp');
const scrollDown = document.getElementById('scrollDown');
const floatingScroll = document.querySelector('.floating-scroll');
const footerStop = document.getElementById('footerBackToTop');
const sections = Array.from(document.querySelectorAll('main section'));
const header = document.querySelector('header');
const headerOffset = header ? header.offsetHeight + 12 : 92;

sections.forEach((section) => {
  section.style.scrollMarginTop = `${headerOffset}px`;
});

const scrollToSection = (section) => {
  if (!section) return;
  section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
};

const getCurrentSectionIndex = () => {
  const marker = window.scrollY + headerOffset + 8;
  const foundIndex = sections.findIndex((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    return marker >= top && marker < bottom;
  });
  if (foundIndex !== -1) return foundIndex;
  return sections.length - 1;
};

const updateScrollButtons = () => {
  const currentIndex = getCurrentSectionIndex();
  const lastIndex = sections.length - 1;
  const atTop = currentIndex <= 0;
  const atBottom = currentIndex >= lastIndex;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  let reachedStop = false;

  if (floatingScroll) {
    floatingScroll.style.display = 'flex';
    floatingScroll.style.position = 'fixed';
    floatingScroll.style.bottom = '1.5rem';
    floatingScroll.style.top = 'auto';
    if (isMobile && footerStop) {
      const stopPoint = footerStop.getBoundingClientRect().bottom + window.scrollY;
      const offset = -9;
      reachedStop = window.scrollY + window.innerHeight >= stopPoint;
      if (reachedStop) {
        const maxTop = stopPoint - floatingScroll.offsetHeight - offset;
        floatingScroll.style.position = 'absolute';
        floatingScroll.style.top = `${Math.max(maxTop, 0)}px`;
        floatingScroll.style.bottom = 'auto';
      }
    }
  }

  if (scrollUp) {
    scrollUp.style.display = atTop ? 'none' : 'inline-flex';
  }
  if (scrollDown) {
    scrollDown.style.display = atBottom || reachedStop ? 'none' : 'inline-flex';
  }
  if (scrollTopButton) {
    scrollTopButton.style.display = atBottom ? 'inline-flex' : 'none';
  }
};

if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    scrollToSection(sections[0]);
  });
}
if (scrollUp) {
  scrollUp.addEventListener('click', () => {
    const currentIndex = getCurrentSectionIndex();
    scrollToSection(sections[Math.max(0, currentIndex - 1)]);
  });
}
if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    const currentIndex = getCurrentSectionIndex();
    scrollToSection(sections[Math.min(sections.length - 1, currentIndex + 1)]);
  });
}

updateScrollButtons();
window.addEventListener('load', updateScrollButtons);
window.addEventListener('scroll', updateScrollButtons, { passive: true });
window.addEventListener('resize', updateScrollButtons);

const partnersToggle = document.getElementById('togglePartners');
const partnersGrid = document.getElementById('partnersGrid');
const partnersToggleLabel = document.getElementById('togglePartnersLabel');

if (partnersToggle && partnersGrid && partnersToggleLabel) {
  partnersToggle.addEventListener('click', () => {
    const isExpanded = partnersToggle.getAttribute('aria-expanded') === 'true';
    partnersToggle.setAttribute('aria-expanded', String(!isExpanded));
    partnersGrid.classList.toggle('partners-collapsed', isExpanded);
    partnersToggle.querySelector('span.material-symbols-outlined').textContent = !isExpanded ? 'expand_less' : 'expand_more';
    partnersToggleLabel.textContent = !isExpanded ? 'Ver menos colaboradores' : 'Ver todos los colaboradores';
  });
}
