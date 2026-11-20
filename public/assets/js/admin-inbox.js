// Gestione completa di Richieste (inquiries) e Recensioni (reviews) nella dashboard.
import { supabase } from './supabase.js';
import { t, addTranslations } from './i18n.js';

addTranslations({
 it:{inSearch:"Cerca nome, email, messaggio…",stAll:"Tutte",stNew:"Nuove",stContacted:"Contattate",stClosed:"Chiuse",markContacted:"Segna contattato",closeLead:"Chiudi",reopen:"Riapri",sendEmail:"Email",call:"Chiama",wa:"WhatsApp",noPhone:"Nessun telefono",noLeads:"Nessuna richiesta ricevuta.",noRevs:"Nessuna recensione ricevuta.",exportCsv:"Esporta CSV",refresh:"Aggiorna",approve:"Approva",hide:"Nascondi",delRev:"Elimina",revPending:"Da verificare",revPublished:"Pubblicata",rvAll:"Tutte",rvPending:"Da verificare",rvPub:"Pubblicate",confirmDel:"Eliminare definitivamente?",actFail:"Operazione non riuscita. Verifica i permessi (RLS) in Supabase.",notes:"Note interne",saveNote:"Salva nota",noteSaved:"Nota salvata.",newBadge:"NUOVA",openCar:"Apri scheda",pContacted:"Contattata",pClosed:"Chiusa",total:"totali",delLead:"Elimina",confirmDelN:"Eliminare definitivamente {n} richieste? L'operazione non si può annullare.",delSelected:"Elimina selezionate",delClosed:"Elimina chiuse",selectAll:"Seleziona tutte",selectedN:"selezionate",deletedN:"{n} richieste eliminate.",partialDel:"Eliminate {a} di {b}. Controlla i permessi (RLS) in Supabase.",selectLead:"Seleziona richiesta",deletedOne:"Richiesta eliminata."},
 en:{inSearch:"Search name, email, message…",stAll:"All",stNew:"New",stContacted:"Contacted",stClosed:"Closed",markContacted:"Mark contacted",closeLead:"Close",reopen:"Reopen",sendEmail:"Email",call:"Call",wa:"WhatsApp",noPhone:"No phone",noLeads:"No inquiries received.",noRevs:"No reviews received.",exportCsv:"Export CSV",refresh:"Refresh",approve:"Approve",hide:"Hide",delRev:"Delete",revPending:"Pending",revPublished:"Published",rvAll:"All",rvPending:"Pending",rvPub:"Published",confirmDel:"Delete permanently?",actFail:"Action failed. Check Supabase RLS permissions.",notes:"Internal notes",saveNote:"Save note",noteSaved:"Note saved.",newBadge:"NEW",openCar:"Open vehicle",pContacted:"Contacted",pClosed:"Closed",total:"total",delLead:"Delete",confirmDelN:"Permanently delete {n} inquiries? This cannot be undone.",delSelected:"Delete selected",delClosed:"Delete closed",selectAll:"Select all",selectedN:"selected",deletedN:"{n} inquiries deleted.",partialDel:"Deleted {a} of {b}. Check Supabase RLS permissions.",selectLead:"Select inquiry",deletedOne:"Inquiry deleted."},
 ar:{inSearch:"ابحث بالاسم أو البريد أو الرسالة…",stAll:"الكل",stNew:"جديدة",stContacted:"تم التواصل",stClosed:"مغلقة",markContacted:"تم التواصل",closeLead:"إغلاق",reopen:"إعادة فتح",sendEmail:"بريد",call:"اتصال",wa:"واتساب",noPhone:"بدون هاتف",noLeads:"لا توجد طلبات.",noRevs:"لا توجد تقييمات.",exportCsv:"تصدير CSV",refresh:"تحديث",approve:"اعتماد",hide:"إخفاء",delRev:"حذف",revPending:"بانتظار المراجعة",revPublished:"منشور",rvAll:"الكل",rvPending:"بانتظار المراجعة",rvPub:"منشورة",confirmDel:"حذف نهائي؟",actFail:"فشلت العملية. تحقق من صلاحيات RLS في Supabase.",notes:"ملاحظات داخلية",saveNote:"حفظ الملاحظة",noteSaved:"تم حفظ الملاحظة.",newBadge:"جديد",openCar:"فتح البطاقة",pContacted:"تم التواصل",pClosed:"مغلق",total:"إجمالي",delLead:"حذف",confirmDelN:"حذف {n} طلبات نهائياً؟ لا يمكن التراجع عن ذلك.",delSelected:"حذف المحدد",delClosed:"حذف المغلقة",selectAll:"تحديد الكل",selectedN:"محدد",deletedN:"تم حذف {n} من الطلبات.",partialDel:"تم حذف {a} من {b}. تحقق من صلاحيات RLS في Supabase.",selectLead:"تحديد الطلب",deletedOne:"تم حذف الطلب."}
});

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const state = { leads: [], reviews: [], cars: [], lf: 'all', rf: 'all', q: '', loaded: false, sel: new Set(), visible: [], busy: false };
let openCar = () => {};
export const setCarOpener = fn => { openCar = fn; };
const eur = n => n ? Number(n).toLocaleString('it-IT') + ' €' : '—';
const thumb = c => (c.car_images || []).slice().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))[0]?.image_url || '';
// Collega una richiesta alla sua vettura: car_id (nuovo) oppure nome nel messaggio (vecchie richieste)
function carOf(l) {
  if (l.car_id) return state.cars.find(c => String(c.id) === String(l.car_id)) || null;
  const m = /^🚗 (.+?)(?: \(\d{4}\))? · /.exec(l.message || '');
  if (!m) return null;
  const n = m[1].trim().toLowerCase();
  return state.cars.find(c => `${c.brand} ${c.model}`.trim().toLowerCase() === n) || null;
}
function carCard(l) {
  const c = carOf(l);
  if (!c) return carBadge(l.message);
  const img = thumb(c), st = c.status === 'published' ? '' : `<em class="car-st">${esc(c.status || '')}</em>`;
  const ref = /Rif: (\S+)/.exec(l.message || '')?.[1];
  return `<button type="button" class="car-link" data-open-car="${esc(c.id)}" title="${esc(t('openCar'))}">
    <span class="cl-img">${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : '🚗'}</span>
    <span class="cl-txt"><strong>${esc(c.brand)} ${esc(c.model)}</strong><small>${esc(c.year || '')} · ${eur(c.price)} ${st}</small>${ref ? `<small>Rif: ${esc(ref)}</small>` : ''}</span>
    <span class="cl-go">${esc(t('openCar'))} →</span></button>`;
}

const when = d => d ? new Date(d).toLocaleString(document.documentElement.lang === 'ar' ? 'ar' : document.documentElement.lang === 'en' ? 'en-GB' : 'it-IT', { dateStyle: 'medium', timeStyle: 'short' }) : '';
const digits = p => String(p || '').replace(/[^\d]/g, '');
const stOf = l => l.status || 'new';
const pill = s => ({ new: ['stNew', 'new'], contacted: ['pContacted', 'contacted'], closed: ['pClosed', 'closed'] }[s] || ['stNew', 'new']);

function toolbar(prefix, filters, active) {
  return `<div class="inbox-bar"><div class="inbox-filters">${filters.map(([k, l, n]) => `<button type="button" class="inbox-chip ${active === k ? 'on' : ''}" data-${prefix}f="${k}">${esc(t(l))}${n !== undefined ? ` <b>${n}</b>` : ''}</button>`).join('')}</div></div>`;
}

const carBadge = m => { const x = /^🚗 (.+)\n(?:Rif: (\S+))?/.exec(m || ''); return x ? `<div class="car-badge">🚗 <strong>${esc(x[1])}</strong>${x[2] ? `<span>${esc(x[2])}</span>` : ''}</div>` : ''; };
const stripCar = m => (m || '').replace(/^🚗 .+\n(Rif: \S+\n)?/, '');

function renderLeads() {
  const el = document.getElementById('leadsList'); if (!el) return;
  const q = state.q.toLowerCase(), all = state.leads;
  const cnt = s => all.filter(l => stOf(l) === s).length;
  const rows = all.filter(l => (state.lf === 'all' || stOf(l) === state.lf) && (!q || [l.customer_name, l.email, l.phone, l.message].join(' ').toLowerCase().includes(q)));
  state.visible = rows.map(l => String(l.id));
  el.innerHTML = `<div class="inbox-top"><input type="search" id="leadSearch" class="inbox-search" placeholder="${esc(t('inSearch'))}" value="${esc(state.q)}">
    <button type="button" class="inbox-btn" id="leadCsv">⇩ ${esc(t('exportCsv'))}</button><button type="button" class="inbox-btn" id="leadRefresh">↻ ${esc(t('refresh'))}</button></div>`
    + toolbar('l', [['all', 'stAll', all.length], ['new', 'stNew', cnt('new')], ['contacted', 'stContacted', cnt('contacted')], ['closed', 'stClosed', cnt('closed')]], state.lf)
    + (rows.length ? `<div class="bulk-bar"><label class="bulk-all"><input type="checkbox" id="selAll"><span>${esc(t('selectAll'))}</span></label>
        <span class="bulk-count" id="bulkCount" aria-live="polite"></span>
        <div class="bulk-actions"><button type="button" class="inbox-btn danger" id="bulkDel" disabled>🗑 ${esc(t('delSelected'))}</button>${cnt('closed') ? `<button type="button" class="inbox-btn danger" id="delClosed">🗑 ${esc(t('delClosed'))} (${cnt('closed')})</button>` : ''}</div></div>` : '')
    + (rows.length ? rows.map(l => {
      const s = stOf(l), [lab, cls] = pill(s), next = s === 'new' ? 'contacted' : s === 'contacted' ? 'closed' : 'new';
      const nextLab = s === 'new' ? 'markContacted' : s === 'contacted' ? 'closeLead' : 'reopen';
      const subj = encodeURIComponent('AUTO GRANATO · ' + (l.customer_name || ''));
      return `<article class="lead-card ${s === 'new' ? 'is-new' : ''} ${state.sel.has(String(l.id)) ? 'selected' : ''}" data-id="${esc(l.id)}">
        <header><label class="lead-check" title="${esc(t('selectLead'))}"><input type="checkbox" data-sel="${esc(l.id)}" aria-label="${esc(t('selectLead'))}" ${state.sel.has(String(l.id)) ? 'checked' : ''}></label><div class="lead-avatar">${esc((l.customer_name || '?').charAt(0).toUpperCase())}</div>
          <div class="lead-who"><strong>${esc(l.customer_name)}</strong><small>${esc(when(l.created_at))}</small></div>
          <span class="pill ${cls}">${s === 'new' ? esc(t('newBadge')) : esc(t(lab))}</span></header>
        ${carCard(l)}<blockquote>${esc(stripCar(l.message || '—')).replace(/\n/g, '<br>')}</blockquote>
        <div class="lead-contact"><a href="mailto:${esc(l.email)}?subject=${subj}">✉ ${esc(l.email)}</a>${l.phone ? `<a href="tel:${esc(l.phone)}">☎ ${esc(l.phone)}</a><a target="_blank" rel="noopener" href="https://wa.me/${digits(l.phone)}">◎ ${esc(t('wa'))}</a>` : `<span class="muted">${esc(t('noPhone'))}</span>`}</div>
        <footer><button type="button" class="inbox-btn primary" data-lead-status="${esc(l.id)}" data-next="${next}">${esc(t(nextLab))}</button>
          <button type="button" class="inbox-btn danger" data-lead-del="${esc(l.id)}">🗑 ${esc(t('delLead'))}</button></footer></article>`;
    }).join('') : `<p class="placeholder-text">${esc(t('noLeads'))}</p>`);
  updateBulk();
}

function renderReviews() {
  const el = document.getElementById('reviewsList'); if (!el) return;
  const all = state.reviews, pend = all.filter(r => !r.approved).length;
  const rows = all.filter(r => state.rf === 'all' || (state.rf === 'pending' ? !r.approved : r.approved));
  el.innerHTML = toolbar('r', [['all', 'rvAll', all.length], ['pending', 'rvPending', pend], ['pub', 'rvPub', all.length - pend]], state.rf)
    + (rows.length ? rows.map(r => `<article class="lead-card ${r.approved ? '' : 'is-new'}">
      <header><div class="lead-avatar">${esc((r.display_name || '?').charAt(0).toUpperCase())}</div>
        <div class="lead-who"><strong>${esc(r.display_name)}</strong><small>${esc(when(r.created_at))}</small></div>
        <span class="stars">${'★'.repeat(Math.min(5, r.rating || 0))}${'☆'.repeat(5 - Math.min(5, r.rating || 0))}</span>
        <span class="pill ${r.approved ? 'contacted' : 'new'}">${esc(t(r.approved ? 'revPublished' : 'revPending'))}</span></header>
      <blockquote>${esc(r.comment).replace(/\n/g, '<br>')}</blockquote>
      <footer><button type="button" class="inbox-btn primary" data-rev-toggle="${esc(r.id)}" data-approved="${!r.approved}">${esc(t(r.approved ? 'hide' : 'approve'))}</button>
        <button type="button" class="inbox-btn danger" data-rev-del="${esc(r.id)}">${esc(t('delRev'))}</button></footer></article>`).join('')
      : `<p class="placeholder-text">${esc(t('noRevs'))}</p>`);
}

function badges() {
  const lb = document.getElementById('leadsBadge'), rb = document.getElementById('reviewsBadge');
  const n = state.leads.filter(l => stOf(l) === 'new').length, p = state.reviews.filter(r => !r.approved).length;
  if (lb) { lb.textContent = n; lb.hidden = !n; }
  if (rb) { rb.textContent = p; rb.hidden = !p; }
}

function updateBulk() {
  const n = state.visible.filter(id => state.sel.has(id)).length;
  const all = document.getElementById('selAll'), cnt = document.getElementById('bulkCount'), del = document.getElementById('bulkDel');
  if (all) { all.checked = !!state.visible.length && n === state.visible.length; all.indeterminate = n > 0 && n < state.visible.length; }
  if (cnt) cnt.textContent = n ? `${n} ${t('selectedN')}` : '';
  if (del) del.disabled = !n || state.busy;
}

function toast(msg, bad) {
  const el = Object.assign(document.createElement('div'), { className: 'ag-toast' + (bad ? ' bad' : ''), textContent: msg });
  el.setAttribute('role', 'status'); document.body.appendChild(el);
  setTimeout(() => el.classList.add('out'), 3200); setTimeout(() => el.remove(), 3700);
}

// Elimina richieste a blocchi e verifica quante righe sono state davvero rimosse (RLS può bloccare senza errore)
async function deleteLeads(ids) {
  ids = [...new Set(ids.map(String))];
  if (!ids.length || state.busy) return;
  if (!confirm(ids.length === 1 ? t('confirmDel') : t('confirmDelN').replace('{n}', ids.length))) return;
  state.busy = true; updateBulk();
  const gone = new Set();
  try {
    for (let i = 0; i < ids.length; i += 40) {
      const { data, error } = await supabase.from('inquiries').delete().in('id', ids.slice(i, i + 40)).select('id');
      if (error) { console.error('[AG inbox] delete', error); break; }
      (data || []).forEach(r => gone.add(String(r.id)));
    }
  } finally { state.busy = false; }
  state.leads = state.leads.filter(l => !gone.has(String(l.id)));
  gone.forEach(id => state.sel.delete(id));
  renderLeads(); badges();
  if (gone.size === ids.length) toast(gone.size === 1 ? t('deletedOne') : t('deletedN').replace('{n}', gone.size));
  else toast(t('partialDel').replace('{a}', gone.size).replace('{b}', ids.length), true);
}

export async function loadInbox() {
  const [l, r, c] = await Promise.all([
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(500),
    supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(500),
    supabase.from('cars').select('id,brand,model,year,price,status,car_images(image_url,sort_order)')]);
  state.cars = c.data || [];
  if (l.error) console.error('[AG inbox] inquiries', l.error);
  if (r.error) console.error('[AG inbox] reviews', r.error);
  state.leads = l.data || []; state.reviews = r.data || []; state.loaded = true;
  const have = new Set(state.leads.map(x => String(x.id))); state.sel = new Set([...state.sel].filter(id => have.has(id)));
  renderLeads(); renderReviews(); badges();
}

const fail = () => alert(t('actFail'));
function csv() {
  const head = ['date', 'name', 'email', 'phone', 'status', 'message'];
  const q = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const body = state.leads.map(l => [l.created_at, l.customer_name, l.email, l.phone, stOf(l), l.message].map(q).join(','));
  const blob = new Blob(['\ufeff' + [head.join(','), ...body].join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `richieste-${new Date().toISOString().slice(0, 10)}.csv` });
  a.click(); URL.revokeObjectURL(a.href);
}

export function initInbox() {
  document.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.openCar) return openCar(b.dataset.openCar);
    if (b.id === 'leadRefresh') return loadInbox();
    if (b.id === 'leadCsv') return csv();
    if (b.dataset.lf) { state.lf = b.dataset.lf; state.sel.clear(); return renderLeads(); }
    if (b.dataset.leadDel) return deleteLeads([b.dataset.leadDel]);
    if (b.id === 'bulkDel') return deleteLeads(state.visible.filter(id => state.sel.has(id)));
    if (b.id === 'delClosed') return deleteLeads(state.leads.filter(l => stOf(l) === 'closed').map(l => l.id));
    if (b.dataset.rf) { state.rf = b.dataset.rf; return renderReviews(); }
    if (b.dataset.leadStatus) {
      const { error } = await supabase.from('inquiries').update({ status: b.dataset.next }).eq('id', b.dataset.leadStatus);
      return error ? fail() : loadInbox();
    }
    if (b.dataset.revToggle) {
      const { error } = await supabase.from('reviews').update({ approved: b.dataset.approved === 'true' }).eq('id', b.dataset.revToggle);
      return error ? fail() : loadInbox();
    }
    if (b.dataset.revDel) {
      if (!confirm(t('confirmDel'))) return;
      const { data, error } = await supabase.from('reviews').delete().eq('id', b.dataset.revDel).select('id');
      return error || !data?.length ? fail() : loadInbox();
    }
  });
  document.addEventListener('change', e => {
    const c = e.target;
    if (c.dataset?.sel) {
      c.checked ? state.sel.add(c.dataset.sel) : state.sel.delete(c.dataset.sel);
      c.closest('.lead-card')?.classList.toggle('selected', c.checked); return updateBulk();
    }
    if (c.id === 'selAll') {
      state.visible.forEach(id => c.checked ? state.sel.add(id) : state.sel.delete(id));
      document.querySelectorAll('#leadsList [data-sel]').forEach(x => { x.checked = c.checked; x.closest('.lead-card')?.classList.toggle('selected', c.checked); });
      updateBulk();
    }
  });
  document.addEventListener('input', e => { if (e.target.id === 'leadSearch') { state.q = e.target.value; state.sel.clear(); renderLeads(); const i = document.getElementById('leadSearch'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); } });
  document.getElementById('languageSelect')?.addEventListener('change', () => setTimeout(() => { renderLeads(); renderReviews(); }, 0));
  // aggiornamento automatico ogni 60 s mentre la scheda è visibile
  setInterval(() => { if (state.loaded && !document.hidden) loadInbox(); }, 60000);
}
