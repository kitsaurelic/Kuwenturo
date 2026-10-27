// Dashboard behaviour. Content comes from the Figma frame; there is no back end yet.
(() => {
  const $ = (id) => document.getElementById(id);
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } },
  };
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- Data (from the frame) ----------
  const LESSONS = [
    { id: 'ang-pamilyang-puno-ng-pagmamahal', tone: 'green', street: 'Masipag St.', title: 'Ang Pamilyang Puno ng Pagmamahal', part: 'Pagkatapos Basahin: Suriin', progress: 80 },
    { id: 'ang-angking-galing-ni-ika', tone: 'yellow', street: 'Masipag St.', title: 'Ang Angking Galing ni Ika', part: 'Pagkatapos Basahin: Tuklasin', progress: 80 },
    { id: 'ang-matapang-lumuluha-iyan', tone: 'red', street: 'Masipag St.', title: 'Ang Matapang, Lumuluha Iyan', part: 'Pagkatapos Basahin: Paglalagom', progress: 80 },
    { id: 'ang-kendi-sa-sari-sari-store', tone: 'blue', street: 'Masipag St.', title: 'Ang Kendi sa Sari-Sari Store', part: 'Pagkatapos Basahin: Totoong Buhay', progress: 80 },
  ];
  const SCHEDULED_LESSON = { id: 'ang-piraso-ng-biyaya', street: 'Matiyaga St.', title: 'Ang Piraso ng Biyaya', minutes: 15, topic: 'Sanhi at Bunga' };
  // The frame shows this lesson twice on the same day
  const SCHEDULE = [
    { date: '2026-10-15', lesson: SCHEDULED_LESSON },
    { date: '2026-10-15', lesson: SCHEDULED_LESSON },
  ];
  const FIRST_WEEK = new Date(2026, 9, 12); // Monday, Oktubre 12, 2026 — the week shown in the frame

  const SECTIONS = {
    'gabay-aralin': 'Gabay Aralin',
    'lakbay-aralin': 'Lakbay Aralin',
    'tulong-aralin': 'Tulong Aralin',
    'guro-konek': 'Guro Konek',
  };
  const MONTHS = ['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'];
  const DAYS = ['Linggo', 'Lunes', 'Martes', 'Miyerkoles', 'Huwebes', 'Biyernes', 'Sabado'];

  const allLessons = () => [...LESSONS, SCHEDULED_LESSON];
  const findLesson = (id) => allLessons().find((l) => l.id === id);

  function pill(tone, label, href, accessibleName, glossSet = 'gloss') {
    return `<a class="pill pill-${tone}" href="${href}" aria-label="${escapeHtml(accessibleName)}">
      <span class="pill-label">${label}</span>
      <img class="gloss gloss-top" src="assets/${glossSet}-top.svg" alt="">
      <img class="gloss gloss-bottom" src="assets/${glossSet}-bottom.svg" alt="">
      <img class="gloss gloss-left" src="assets/${glossSet}-left.svg" alt="">
      <img class="gloss gloss-dot" src="assets/${glossSet}-dot.svg" alt="">
    </a>`;
  }

  function progressBar(lesson) {
    return `<div class="lesson-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"
      aria-valuenow="${lesson.progress}" aria-label="Progreso sa ${escapeHtml(lesson.title)}"><span style="width:${lesson.progress}%"></span></div>`;
  }

  // ---------- Mga Aralin ----------
  let filter = 'naantala';

  function renderLessons() {
    const list = LESSONS.filter((l) => (filter === 'natapos' ? l.progress >= 100 : l.progress < 100));
    $('lessons').innerHTML = list.map((l) => `
      <li class="lesson lesson-${l.tone}">
        <img class="lesson-shape" src="assets/card-${l.tone}.svg" alt="">
        <p class="lesson-street">${l.street}</p>
        <h3 class="lesson-title">${l.title}</h3>
        <p class="lesson-part">${l.part}</p>
        ${progressBar(l)}
        <p class="lesson-percent" aria-hidden="true">${l.progress}%</p>
        ${pill(l.tone, 'Ituloy', `#/aralin/${l.id}`, `Ituloy: ${l.title}`)}
        <img class="lesson-badge" src="assets/badge-${l.tone}.svg" alt="">
      </li>`).join('');
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

  function renderSchedule() {
    const from = isoDate(weekStart);
    const to = isoDate(addDays(weekStart, 4));
    const items = SCHEDULE.filter((s) => s.date >= from && s.date <= to);
    $('week-label').textContent = weekLabel(weekStart);
    $('schedule').innerHTML = items.map(({ date, lesson }) => {
      const d = new Date(`${date}T00:00:00`);
      return `
      <li class="sched">
        <div class="sched-row">
          <div class="sched-left">
            <time class="sched-date" datetime="${date}">
              <span class="sched-day">${DAYS[d.getDay()]}</span>
              <span class="sched-num">${d.getDate()}</span>
            </time>
            <div class="sched-body">
              <p class="sched-street">${lesson.street}</p>
              <h3 class="sched-title">${lesson.title}</h3>
              <p class="sched-meta">
                <span><img src="assets/icon-time.svg" alt="">${lesson.minutes} min</span>
                <span><img src="assets/icon-star.svg" alt="">${lesson.topic}</span>
              </p>
            </div>
          </div>
          ${pill('green', 'Aralin', `#/aralin/${lesson.id}`, `Buksan ang aralin: ${lesson.title}`, 'gloss2')}
          <img class="sched-grass" src="assets/grass.png" alt="">
          <img class="sched-kids" src="assets/kids.png" alt="">
        </div>
      </li>`;
    }).join('');
    $('schedule-empty').hidden = items.length > 0;
  }

  $('week-prev').addEventListener('click', () => { weekStart = addDays(weekStart, -7); renderSchedule(); });
  $('week-next').addEventListener('click', () => { weekStart = addDays(weekStart, 7); renderSchedule(); });

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
    } else if (section === 'aralin' && findLesson(id)) {
      const l = findLesson(id);
      const details = l.progress != null
        ? `<p>${l.part}</p><div class="page-progress lesson-${l.tone}">${progressBar(l)}<span>${l.progress}%</span></div>`
        : `<p>${l.minutes} min · ${l.topic}</p>`;
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
    const results = q
      ? allLessons().filter((l) => [l.title, l.street, l.part, l.topic].some((f) => f && f.toLowerCase().includes(q)))
      : allLessons();
    $('search-results').innerHTML = results.map((l) => `
      <li><a href="#/aralin/${l.id}">${l.title}<small>${l.street} · ${l.part || l.topic}</small></a></li>`).join('');
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
