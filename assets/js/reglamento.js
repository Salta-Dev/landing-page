const tocLinks = Array.from(document.querySelectorAll('.toc-link'));
const tocSections = tocLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveToc = (activeId) => {
  tocLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('text-primary', isActive);
    link.classList.toggle('font-medium', isActive);
    link.classList.toggle('text-white/70', !isActive);
  });
};

if (tocSections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveToc(entry.target.id);
        }
      });
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
  );

  tocSections.forEach((section) => observer.observe(section));

  tocLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href')?.slice(1);
      if (targetId) setActiveToc(targetId);
    });
  });
}
