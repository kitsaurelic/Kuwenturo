// Dashboard behaviour. Content comes from the Figma frames; there is no back end yet.
(() => {
  const $ = (id) => document.getElementById(id);
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } },
  };
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- Data (from the frames) ----------
  // art: the characters drawn on the schedule card, with the frame's crop of each image
  const LESSONS = {
    'ang-pamilyang-puno-ng-pagmamahal': {
      title: 'Ang Pamilyang Puno ng Pagmamahal', street: 'Masipag St.', topic: 'Detalye ng Kuwento', minutes: 15,
      art: { src: 'kids-1.png', box: [174.7, -2.29, 106, 101], img: 'left:10.65%;top:2.86%;width:78.71%;height:259.85%' },
    },
    'ang-angking-galing-ni-ika': {
      title: 'Ang Angking Galing ni Ika', street: 'Masipag St.', topic: 'Detalye ng Kuwento', minutes: 15,
      art: { src: 'kids-2.png', box: [161.7, -4.29, 132, 103], img: 'left:-0.19%;top:0.47%;width:100.38%;height:100.99%' },
    },
    'ang-kendi-sa-sari-sari-store': {
      title: 'Ang Kendi sa Sari-Sari Store', street: 'Masipag St.', topic: 'Damdamin ng Tauhan', minutes: 15,
      art: { src: 'kids-3.png', box: [161.7, -8.29, 132, 107], img: 'left:14.28%;top:-0.11%;width:71.44%;height:103.96%' },
    },
    'ang-piraso-ng-biyaya': {
      title: 'Ang Piraso ng Biyaya', street: 'Matiyaga St.', topic: 'Sanhi at Bunga', minutes: 15,
      art: { src: 'kids-4.png', box: [138.7, -0.08, 180, 108], img: 'inset:0;width:100%;height:100%;object-fit:cover' },
    },
    'sa-likod-ng-kompyuter': {
      title: 'Sa Likod ng Kompyuter', street: 'Matiyaga St.', topic: 'Problema at Solusyon', minutes: 15,
      art: { src: 'kids-5.png', box: [161.7, 3.71, 132, 103], img: 'inset:0;width:100%;height:100%;object-fit:contain' },
    },
    'ang-kaniyang-munting-ngiti': { title: 'Ang Kaniyang Munting Ngiti', street: 'Masipag St.' },
    'ang-timpla-ng-taho': { title: 'Ang Timpla ng Taho', street: 'Masipag St.' },
    'ang-matapang-lumuluha-iyan': { title: 'Ang Matapang, Lumuluha Iyan', street: 'Masipag St.' },
    'ang-limampung-piso-ko': { title: 'Ang Limampung Piso Ko', street: 'Masipag St.' },
  };

  // Mga Aralin cards. Both frames label every card "Masipag St." and "Pagkatapos Basahin: Suriin".
  const PART = 'Pagkatapos Basahin: Suriin';
  const BADGES = { green: 'badge-star.png', yellow: 'badge-crown.png', red: 'badge-cup.png' };
  const CARDS = {
    naantala: [
      { id: 'ang-pamilyang-puno-ng-pagmamahal', tone: 'green', progress: 80, wide: true },
      { id: 'ang-kaniyang-munting-ngiti', tone: 'yellow', progress: 80 },
      { id: 'ang-timpla-ng-taho', tone: 'red', progress: 80 },
      { id: 'ang-kendi-sa-sari-sari-store', tone: 'green', progress: 80 },
    ],
    natapos: [
      { id: 'ang-matapang-lumuluha-iyan', tone: 'green', progress: 100 },
      { id: 'sa-likod-ng-kompyuter', tone: 'yellow', progress: 100 },
      { id: 'ang-limampung-piso-ko', tone: 'red', progress: 100 },
      { id: 'ang-piraso-ng-biyaya', tone: 'green', progress: 100 },
    ],
  };
  const cardFor = (id) => [...CARDS.naantala, ...CARDS.natapos].find((c) => c.id === id);

  // Iskedyul: date -> lesson id. Palitan changes are kept in this browser.
  const DEFAULT_SCHEDULE = {
    '2026-10-12': 'ang-pamilyang-puno-ng-pagmamahal',
    '2026-10-13': 'ang-angking-galing-ni-ika',
    '2026-10-14': 'ang-kendi-sa-sari-sari-store',
    '2026-10-15': 'ang-piraso-ng-biyaya',
    '2026-10-16': 'sa-likod-ng-kompyuter',
  };
  let schedule = { ...DEFAULT_SCHEDULE };
  try { Object.assign(schedule, JSON.parse(storage.get('kuwenturo.schedule')) || {}); } catch { /* ignore bad data */ }
  Object.keys(schedule).forEach((d) => { if (!LESSONS[schedule[d]]) schedule[d] = DEFAULT_SCHEDULE[d]; });
  const FIRST_WEEK = new Date(2026, 9, 12); // Lunes, Oktubre 12, 2026 — the week shown in the frames

  const SECTIONS = {
    'gabay-aralin': 'Gabay Aralin',
    'lakbay-aralin': 'Lakbay Aralin',
    'tulong-aralin': 'Tulong Aralin',
    'guro-konek': 'Guro Konek',
  };
  const MONTHS = ['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'];
  const DAYS = ['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'];

  // Glossy pill. Gloss sets: card buttons, navy (Aralin), light (Palitan).
  const GLOSS = {
    card: ['gloss-top', 'gloss-bottom', 'gloss-left', 'gloss-dot'],
    navy: ['gloss-navy-top', 'gloss-navy-bottom', 'gloss-navy-left', 'gloss-navy-dot'],
    light: ['gloss-top', 'gloss-bottom', 'gloss-left-light', 'gloss-dot-light'],
  };
  function pill({ tone, label, name, href, gloss = 'card', attrs = '' }) {
    const [top, bottom, left, dot] = GLOSS[gloss];
    const inner = `<span class="pill-label">${label}</span>
      <img class="gloss gloss-top" src="assets/${top}.svg" alt="">
      <img class="gloss gloss-bottom" src="assets/${bottom}.svg" alt="">
      <img class="gloss gloss-left" src="assets/${left}.svg" alt="">
      <img class="gloss gloss-dot" src="assets/${dot}.svg" alt="">`;
    return href
      ? `<a class="pill pill-${tone}" href="${href}" aria-label="${escapeHtml(name)}">${inner}</a>`
      : `<button type="button" class="pill pill-${tone}" aria-label="${escapeHtml(name)}" ${attrs}>${inner}</button>`;
  }

  function progressBar(title, progress) {
    return `<div class="lesson-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"
      aria-valuenow="${progress}" aria-label="Progreso sa ${escapeHtml(title)}"><span style="width:${progress}%"></span></div>`;
  }

  // ---------- Mga Aralin ----------
  let filter = 'naantala';

  function renderLessons() {
    const list = CARDS[filter];
    $('lessons').innerHTML = list.map((c) => {
      const l = LESSONS[c.id];
      return `
      <li class="lesson lesson-${c.tone}">
        <img class="lesson-head" src="assets/card-head-${c.tone}.svg" alt="">
        <img class="lesson-body" src="assets/card-body-${c.tone}.svg" alt="">
        <div class="lesson-text">
          <p class="lesson-street">Masipag St.</p>
          <div class="lesson-info">
            <div class="lesson-copy">
              <div class="lesson-heading">
                <h3 class="lesson-title"${c.wide ? ' style="--title-w:100%"' : ''}>${l.title}</h3>
                <p class="lesson-part">${PART}</p>
              </div>
              ${progressBar(l.title, c.progress)}
            </div>
            <div class="lesson-row">
              ${pill({ tone: c.tone, label: 'Ituloy', name: `Ituloy: ${l.title}`, href: `#/aralin/${c.id}` })}
              <p class="lesson-percent" aria-hidden="true">${c.progress}%</p>
            </div>
          </div>
        </div>
        <img class="lesson-badge" src="assets/${BADGES[c.tone]}" alt="">
      </li>`;
    }).join('');
    const empty = $('lessons-empty');
    empty.hidden = list.length > 0;
    empty.textContent = filter === 'natapos' ? 'Wala ka pang natapos na aralin.' : 'Wala kang naantalang aralin.';
  }

  document.querySelectorAll('.seg-btn').forEach((button) => {
    button.addEventListener('click', () => {
      filter = button.dataset.filter;
      document.querySelectorAll('.seg-btn').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      renderLessons();
    });
  });

  // ---------- Iskedyul ----------
  let weekStart = new Date(FIRST_WEEK);
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  function weekLabel(start) {
    const end = addDays(start, 4); // Lunes–Biyernes
    if (start.getFullYear() !== end.getFullYear()) {
      return `${MONTHS[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()} – ${MONTHS[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
    }
    if (start.getMonth() !== end.getMonth()) {
      return `${MONTHS[start.getMonth()]} ${start.getDate()} – ${MONTHS[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
    }
    return `${MONTHS[start.getMonth()]} ${start.getDate()}-${end.getDate()}, ${end.getFullYear()}`;
  }

  function kidsArt(art) {
    if (!art) return '';
    const [right, top, w, h] = art.box;
    return `<span class="sched-kids" style="right:${right}px;top:${top}px;width:${w}px;height:${h}px">
      <img src="assets/${art.src}" alt="" style="${art.img}"></span>`;
  }

  function renderSchedule() {
    const days = [0, 1, 2, 3, 4].map((n) => isoDate(addDays(weekStart, n))).filter((d) => schedule[d]);
    $('week-label').textContent = weekLabel(weekStart);
    $('schedule').innerHTML = days.map((date) => {
      const id = schedule[date];
      const l = LESSONS[id];
      const d = new Date(`${date}T00:00:00`);
      const meta = l.topic
        ? `<p class="sched-meta"><span><img src="assets/icon-time.svg" alt="">${l.minutes} min</span><span><img src="assets/icon-star.svg" alt="">${l.topic}</span></p>`
        : '';
      return `
      <li class="sched">
        <div class="sched-row">
          <img class="sched-grass" src="assets/grass.png" alt="">
          <div class="sched-left">
            <time class="sched-date" datetime="${date}">
              <span class="sched-day">${DAYS[d.getDay()]}</span>
              <span class="sched-num">${d.getDate()}</span>
            </time>
            <div class="sched-body">
              <p class="sched-street">${l.street}</p>
              <h3 class="sched-title">${l.title}</h3>
              ${meta}
            </div>
          </div>
          <div class="sched-actions">
            ${pill({ tone: 'navy', label: 'Aralin', name: `Buksan ang aralin: ${l.title}`, href: `#/aralin/${id}`, gloss: 'navy' })}
            ${pill({ tone: 'light', label: 'Palitan', name: `Palitan ang aralin sa ${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`, gloss: 'light', attrs: `data-swap="${date}"` })}
          </div>
          ${kidsArt(l.art)}
        </div>
      </li>`;
    }).join('');
    $('schedule-empty').hidden = days.length > 0;
  }

  $('week-prev').addEventListener('click', () => { weekStart = addDays(weekStart, -7); renderSchedule(); });
  $('week-next').addEventListener('click', () => { weekStart = addDays(weekStart, 7); renderSchedule(); });

  // ---------- Palitan ----------
  const swapDialog = $('swap-dialog');
  let swapDate = null;

  $('schedule').addEventListener('click', (event) => {
    const button = event.target.closest('[data-swap]');
    if (!button) return;
    swapDate = button.dataset.swap;
    const d = new Date(`${swapDate}T00:00:00`);
    const current = schedule[swapDate];
    $('swap-desc').textContent = `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()} — kasalukuyan: ${LESSONS[current].title}`;
    $('swap-list').querySelectorAll('label').forEach((el) => el.remove());
    $('swap-list').insertAdjacentHTML('beforeend', Object.entries(LESSONS).map(([id, l]) => `
      <label class="swap-option">
        <input type="radio" name="swap" value="${id}"${id === current ? ' checked' : ''}>
        <span>${l.title}<small>${l.street}${l.topic ? ` · ${l.topic}` : ''}</small></span>
      </label>`).join(''));
    button.focus(); // focus returns here when the dialog closes
    swapDialog.showModal();
    $('swap-list').querySelector('input:checked').focus();
  });

  $('swap-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const chosen = $('swap-form').querySelector('input[name="swap"]:checked').value;
    const changed = chosen !== schedule[swapDate];
    schedule[swapDate] = chosen;
    const overrides = Object.fromEntries(Object.entries(schedule).filter(([d, id]) => DEFAULT_SCHEDULE[d] !== id));
    storage.set('kuwenturo.schedule', JSON.stringify(overrides));
    swapDialog.close();
    renderSchedule();
    const again = $('schedule').querySelector(`[data-swap="${swapDate}"]`);
    if (again) again.focus();
    if (changed) announce(`Napalitan: ${LESSONS[chosen].title}`);
  });

  // ---------- Routing (#/, #/gabay-aralin, #/aralin/<id>) ----------
  function showPage({ kicker, title, body }) {
    $('view-dashboard').hidden = true;
    $('view-page').hidden = false;
    $('page-kicker').textContent = kicker;
    $('page-title').textContent = title;
    $('page-body').innerHTML = body;
    document.title = `${title} — Kuwenturo`;
    $('page-title').focus();
  }

  function route() {
    const path = location.hash.replace(/^#\/?/, '');
    const [section, id] = path.split('/');
    const navKey = section === 'aralin' ? 'dashboard' : (SECTIONS[section] ? section : 'dashboard');
    document.querySelectorAll('.nav-link[data-route]').forEach((a) => {
      if (a.dataset.route === navKey) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    if (SECTIONS[section]) {
      showPage({ kicker: 'Kuwenturo', title: SECTIONS[section], body: '<p>Ginagawa pa ang bahaging ito. Malapit na!</p>' });
    } else if (section === 'aralin' && LESSONS[id]) {
      const l = LESSONS[id];
      const card = cardFor(id);
      const details = [
        card ? `<p>${PART}</p><div class="page-progress lesson-${card.tone}">${progressBar(l.title, card.progress)}<span>${card.progress}%</span></div>` : '',
        l.topic ? `<p>${l.minutes} min · ${l.topic}</p>` : '',
      ].join('');
      showPage({ kicker: l.street, title: l.title, body: `${details}<p>Malapit na ang nilalaman ng araling ito.</p>` });
    } else {
      const wasHidden = $('view-dashboard').hidden;
      $('view-page').hidden = true;
      $('view-dashboard').hidden = false;
      document.title = 'Dashboard — Kuwenturo';
      if (wasHidden) $('main').focus();
    }
    closeDrawer(false);
    window.scrollTo(0, 0);
  }

  // Screen-reader announcements
  const live = document.createElement('p');
  live.className = 'sr-only';
  live.setAttribute('role', 'status');
  document.body.appendChild(live);
  function announce(message) {
    live.textContent = '';
    setTimeout(() => { live.textContent = message; }, 50);
  }

  // ---------- Sidebar: collapse (tablet/desktop) and drawer (mobile) ----------
  const app = $('app');
  const isMobile = () => window.matchMedia('(max-width: 640px)').matches;
  const collapseBtn = $('collapse-btn');
  const menuBtn = $('menu-btn');
  const scrim = $('scrim');
  const stage = $('stage');

  let collapsed = storage.get('kuwenturo.sidebar') === null
    ? window.matchMedia('(max-width: 1023px)').matches
    : storage.get('kuwenturo.sidebar') === 'collapsed';

  function syncSidebar() {
    const mobile = isMobile();
    app.classList.toggle('is-collapsed', collapsed && !mobile);
    const expanded = mobile ? app.classList.contains('is-drawer-open') : !collapsed;
    collapseBtn.setAttribute('aria-expanded', String(expanded));
    $('collapse-label').textContent = mobile ? 'Isara ang menu' : (collapsed ? 'Palakihin ang sidebar' : 'Paliitin ang sidebar');
  }

  function openDrawer() {
    app.classList.add('is-drawer-open');
    scrim.hidden = false;
    stage.inert = true;
    menuBtn.setAttribute('aria-expanded', 'true');
    syncSidebar();
    document.querySelector('.nav-link[aria-current="page"]')?.focus();
  }

  function closeDrawer(returnFocus = true) {
    if (!app.classList.contains('is-drawer-open')) return;
    app.classList.remove('is-drawer-open');
    scrim.hidden = true;
    stage.inert = false;
    menuBtn.setAttribute('aria-expanded', 'false');
    syncSidebar();
    if (returnFocus) menuBtn.focus();
  }

  collapseBtn.addEventListener('click', () => {
    if (isMobile()) { closeDrawer(); return; }
    collapsed = !collapsed;
    storage.set('kuwenturo.sidebar', collapsed ? 'collapsed' : 'expanded');
    syncSidebar();
  });
  menuBtn.addEventListener('click', openDrawer);
  scrim.addEventListener('click', () => closeDrawer());
  window.matchMedia('(max-width: 640px)').addEventListener('change', () => { closeDrawer(false); syncSidebar(); });

  // ---------- Popovers (notifications, profile) ----------
  const popoverButtons = [...document.querySelectorAll('.icon-btn[aria-controls]')];

  function closePopovers(except) {
    popoverButtons.forEach((btn) => {
      if (btn === except) return;
      btn.setAttribute('aria-expanded', 'false');
      $(btn.getAttribute('aria-controls')).hidden = true;
    });
  }

  popoverButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const panel = $(btn.getAttribute('aria-controls'));
      const open = panel.hidden;
      closePopovers(btn);
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.popover')) closePopovers();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = popoverButtons.find((b) => b.getAttribute('aria-expanded') === 'true');
    if (open) { closePopovers(); open.focus(); }
    else closeDrawer();
  });

  // Profile + log out
  let session = {};
  try { session = JSON.parse(sessionStorage.getItem('kuwenturo.session')) || {}; } catch { /* storage unavailable */ }
  $('profile-who').textContent = session.email
    ? `Naka-log in bilang ${session.email}`
    : 'Naka-log in gamit ang Google';
  $('logout').addEventListener('click', () => {
    try { sessionStorage.removeItem('kuwenturo.session'); } catch { /* storage unavailable */ }
    location.href = '../login/index.html';
  });

  // ---------- Dialogs (search, help) ----------
  document.querySelectorAll('[data-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialog = $(trigger.dataset.open);
      closePopovers();
      closeDrawer(false);
      trigger.focus(); // focus returns here when the dialog closes
      dialog.showModal();
      if (dialog.id === 'search-dialog') { $('search-input').value = ''; renderSearch(''); }
    });
  });
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  });

  // ---------- Search ----------
  function renderSearch(query) {
    const q = query.trim().toLowerCase();
    const all = Object.entries(LESSONS);
    const results = q
      ? all.filter(([, l]) => [l.title, l.street, l.topic].some((f) => f && f.toLowerCase().includes(q)))
      : all;
    $('search-results').innerHTML = results.map(([id, l]) => `
      <li><a href="#/aralin/${id}">${l.title}<small>${l.street}${l.topic ? ` · ${l.topic}` : ''}</small></a></li>`).join('');
    $('search-count').textContent = !q
      ? `${results.length} aralin`
      : results.length
        ? `${results.length} resulta para sa “${query.trim()}”`
        : `Walang nahanap para sa “${query.trim()}”.`;
  }
  $('search-input').addEventListener('input', (e) => renderSearch(e.target.value));
  $('search-results').addEventListener('click', (e) => { if (e.target.closest('a')) $('search-dialog').close(); });

  // ---------- Start ----------
  renderLessons();
  renderSchedule();
  syncSidebar();
  window.addEventListener('hashchange', route);
  route();
})();
