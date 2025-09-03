// Theme toggle with persistence
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light');
  function setIcon() {
    if (!btn) return;
    const isLight = document.body.classList.contains('light');
    btn.innerHTML = isLight
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  setIcon();
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.add('theme-transition');
      document.body.classList.toggle('light');
      localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
      setIcon();
      setTimeout(() => document.body.classList.remove('theme-transition'), 350);
    });
  }
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Scroll reveal with IntersectionObserver
(function () {
  const items = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
})();

// 3D tilt for project cards
(function () {
  const cards = document.querySelectorAll('.card.project');
  const constrain = 16; // lower is more tilt
  function tilt(event, card) {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const rx = (+dy / constrain);
    const ry = (-dx / constrain);
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => tilt(e, card));
    card.addEventListener('mouseleave', () => { card.style.transform = 'none'; });
  });
})();

// Sections stay static; movement handled by inner cards via CSS/JS above



