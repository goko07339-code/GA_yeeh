import { supabase } from './supabase.js';
import './home-i18n.js';
import { applyLanguage } from './i18n.js';
import { initTheme } from './theme.js';
import { initGallery, initMap } from './gallery.js';

const boot = () => {
  initTheme();
  const sel = document.getElementById('languageSelect');
  const lang = localStorage.getItem('ag-language') || 'it';
  sel.value = lang; applyLanguage(lang);
  sel.addEventListener('change', e => applyLanguage(e.target.value));
  document.getElementById('yearNow').textContent = new Date().getFullYear();

  const header = document.getElementById('top'), bar = document.getElementById('progress'), nav = document.getElementById('navlinks');
  const onScroll = () => {
    header.classList.toggle('solid', scrollY > 40);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  document.getElementById('menuBtn').addEventListener('click', () => nav.classList.toggle('open'));
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  initMap();
  initGallery(supabase);
};
// La configurazione viene decifrata in modo asincrono: il DOM potrebbe essere già pronto.
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
