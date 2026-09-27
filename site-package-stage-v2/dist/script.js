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
function closeMenu() {
  document.body.classList.remove('menu-open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Abrir menu');
}
menu?.addEventListener('click', () => {
  const open = !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => {
  if (document.body.classList.contains('menu-open') && !e.target.closest('.site-header')) closeMenu();
});

if (!reduced.matches && 'IntersectionObserver' in window) {
  root.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -45px 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    if (paused) el.classList.add('is-visible');
    else observer.observe(el);
  });
  motionToggle?.addEventListener('click', () => {
    if (paused) document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  });
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

document.querySelectorAll('[data-whatsapp-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const company = String(data.get('company') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();
    const text = ['Olá, Moratech! Meu nome é ' + name + '.', company ? 'Empresa: ' + company + '.' : '', 'Tenho interesse em: ' + service + '.', 'Minha necessidade: ' + message].filter(Boolean).join('\n');
    const url = 'https://wa.me/5519991811853?text=' + encodeURIComponent(text);
    const status = form.querySelector('.form-status');
    if (status) status.textContent = 'Abrindo WhatsApp para você revisar a mensagem.';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
