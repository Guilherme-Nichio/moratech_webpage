const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.querySelector('.motion-toggle');
let paused = false;
try { paused = sessionStorage.getItem('moratech-motion-paused') === '1'; } catch {}
function setMotion(value) {
  paused = value;
  root.classList.toggle('motion-paused', value);
  if (motionToggle) {
    motionToggle.setAttribute('aria-pressed', String(value));
    motionToggle.textContent = value ? 'Ativar efeitos' : 'Pausar efeitos';
  }
  try { sessionStorage.setItem('moratech-motion-paused', value ? '1' : '0'); } catch {}
}
setMotion(paused);
motionToggle?.addEventListener('click', () => setMotion(!paused));

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu({ restoreFocus = false } = {}) {
  const wasOpen = document.body.classList.contains('menu-open');
  document.body.classList.remove('menu-open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Abrir menu');
  if (restoreFocus && wasOpen) menu?.focus();
}
menu?.addEventListener('click', () => {
  const open = !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  if (open) nav?.querySelector('a')?.focus({ preventScroll: true });
});
nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu({ restoreFocus: true }); });
document.addEventListener('click', e => {
  if (document.body.classList.contains('menu-open') && !e.target.closest('.site-header')) closeMenu();
});
const desktopNavigation = matchMedia('(min-width: 901px)');
const closeMenuOnDesktop = e => { if (e.matches) closeMenu(); };
if (desktopNavigation.addEventListener) desktopNavigation.addEventListener('change', closeMenuOnDesktop);
else desktopNavigation.addListener(closeMenuOnDesktop);

if (!reduced.matches && 'IntersectionObserver' in window) {
  root.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -45px 0px', threshold: 0.08 });
  document.querySelectorAll('.feature-grid, .related-grid, .datacaixa-boxes, .partnership-grid').forEach(group => {
    group.querySelectorAll('.reveal').forEach((el, i) => el.style.setProperty('--reveal-delay', Math.min(i, 4) * 75 + 'ms'));
  });
  document.querySelectorAll('.reveal').forEach(el => {
    if (paused) el.classList.add('is-visible');
    else observer.observe(el);
  });
  motionToggle?.addEventListener('click', () => {
    if (paused) document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  });
}

const progress = document.querySelector('.scroll-progress');
const media = [...document.querySelectorAll('.parallax-media')];
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
  if (reduced.matches || paused) return;
  for (const element of media) {
    const box = element.parentElement.getBoundingClientRect();
    if (box.bottom < 0 || box.top > innerHeight) continue;
    const center = box.top + box.height / 2;
    const shift = Math.max(-20, Math.min(20, (innerHeight / 2 - center) * 0.045));
    element.style.setProperty('--media-shift', shift.toFixed(1) + 'px');
  }
}
function scheduleScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
}
addEventListener('scroll', scheduleScroll, { passive: true });
addEventListener('resize', scheduleScroll);
scheduleScroll();
if ('IntersectionObserver' in window) {
  const sections = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle('is-current', entry.isIntersecting);
  }, { rootMargin: '-25% 0px -25% 0px', threshold: 0 });
  document.querySelectorAll('.showcase-section, .datacaixa-section, .partnership-section').forEach(section => sections.observe(section));
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(item => {
      item.hidden = filter !== 'all' && !item.dataset.category.split(' ').includes(filter);
      if (!item.hidden) count++;
    });
    const status = document.querySelector('#filter-status');
    if (status) status.textContent = count + (count === 1 ? ' solução encontrada.' : ' soluções encontradas.');
  });
});

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
