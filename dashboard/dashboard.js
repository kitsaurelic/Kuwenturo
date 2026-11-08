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
    // Kuwento 3 of Masipag St. (Figma 4679:2792); the order here is the Gabay story order
    'ang-matapang-lumuluha-iyan': {
      title: 'Ang Matapang, Lumuluha Iyan', street: 'Masipag St.', topic: 'Damdamin ng Tauhan', minutes: 15,
      art: { src: 'kids-6.png', box: [174.71, -14.29, 106, 121], img: 'left:11.8%;top:3.24%;width:76.41%;height:96.83%' },
    },
    'ang-kendi-sa-sari-sari-store': {
      title: 'Ang Kendi sa Sari-Sari Store', street: 'Masipag St.', topic: 'Damdamin ng Tauhan', minutes: 15,
      art: { src: 'kids-3.png', box: [161.7, -8.29, 132, 107], img: 'left:14.28%;top:-0.11%;width:71.44%;height:103.96%' },
    },
    'ang-piraso-ng-biyaya': {
      title: 'Ang Piraso ng Biyaya', street: 'Matiyaga St.', topic: 'Sanhi at Bunga', minutes: 15,
      art: { src: 'kids-4.png', box: [138.7, -0.08, 180, 108], img: 'inset:0;width:100%;height:100%;object-fit:cover' },
    },
    // Kuwento 2 of Matiyaga St. (Figma 4801:3236)
    'ang-kaniyang-munting-ngiti': {
      title: 'Ang Kaniyang Munting Ngiti', street: 'Matiyaga St.', topic: 'Sanhi at Bunga', minutes: 15,
      art: { src: 'kids-7.png', box: [174.71, -12.29, 106, 121], img: 'left:10.48%;top:-0.08%;width:79.04%;height:100.17%' },
    },
    'sa-likod-ng-kompyuter': {
      title: 'Sa Likod ng Kompyuter', street: 'Matiyaga St.', topic: 'Problema at Solusyon', minutes: 15,
      art: { src: 'kids-5.png', box: [161.7, 3.71, 132, 103], img: 'inset:0;width:100%;height:100%;object-fit:contain' },
    },
    // Kuwento 4 of Matiyaga St. (Figma 4801:6628)
    'ang-guhit-na-hindi-nakikita': {
      title: 'Ang Guhit na Hindi Nakikita', street: 'Matiyaga St.', topic: 'Problema at Solusyon', minutes: 15,
      art: { src: 'kids-8.png', box: [151.71, -2.29, 152, 114], img: 'left:-0.21%;top:7.46%;width:100.42%;height:87.77%' },
    },
    // Kuwento 1 of Matatag St. (Figma 4801:10834)
    'ang-limampung-piso-ko': {
      title: 'Ang Limampung Piso Ko', street: 'Matatag St.', topic: 'Pagkakasunod ng Pangyayari', minutes: 15,
      art: { src: 'kids-9.png', box: [174.71, -9.29, 106, 115], img: 'left:13.3%;top:-0.06%;width:73.42%;height:100.12%' },
    },
    // Kuwento 2 of Matatag St. (Figma 4801:11671)
    'ang-timpla-ng-taho': {
      title: 'Ang Timpla ng Taho', street: 'Matatag St.', topic: 'Pagkakasunod ng Pangyayari', minutes: 15,
      cardTitle: 'Ang Timpla <br>ng Taho', // Tulong Aralin card breaks the line here (Figma 4879:11208)
      art: { src: 'kids-10.png', box: [174.71, -9.29, 106, 115], img: 'left:12.95%;top:-0.06%;width:74.11%;height:100.12%' },
    },
  };

  // Mga Aralin cards show the story's street (yellow cards are Matiyaga St., red cards Matatag St.). Both frames label every card "Pagkatapos Basahin: Suriin".
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
    'tulong-sa-paggamit': 'Tulong sa Paggamit',
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
      const done = c.progress === 100; // Natapos cards get the ribbon and Balikan (Figma 4548:3609)
      const action = done ? 'Balikan' : 'Ituloy';
      return `
      <li class="lesson lesson-${c.tone}${done ? ' is-done' : ''}">
        <p class="lesson-street">${l.street}</p>
        <div class="lesson-text">
          <div class="lesson-info">
            <div class="lesson-copy">
              <div class="lesson-heading">
                <h3 class="lesson-title"${c.wide ? ' style="--title-w:100%"' : ''}>${l.title}</h3>
                <p class="lesson-part">${PART}</p>
              </div>
              ${progressBar(l.title, c.progress)}
            </div>
            <div class="lesson-row">
              ${pill({ tone: c.tone, label: action, name: `${action}: ${l.title}`, href: `#/aralin/${c.id}` })}
              <p class="lesson-percent" aria-hidden="true">${c.progress}%</p>
            </div>
          </div>
        </div>
        ${done ? `<img class="lesson-badge" src="assets/${BADGES[c.tone]}" alt="">` : ''}
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

  // ---------- Gabay Aralin (#/gabay-aralin, #/gabay-aralin/<bago-basahin|basahin|pagkatapos-basahin>) ----------
  const GUIDES = window.KUWENTURO_GUIDES || {};
  const STREETS = ['Masipag St.', 'Matiyaga St.', 'Matatag St.'];
  const GUIDE_PARTS = {
    'bago-basahin': { label: 'Bago Basahin', sign: 'sign-bago.png' },
    basahin: { label: 'Basahin', sign: 'sign-basahin.png' },
    'pagkatapos-basahin': { label: 'Pagkatapos Basahin', sign: 'sign-pagkatapos.png' },
  };
  const INFO_TONES = [['paksa', 'Paksa', 'green'], ['aral', 'Aral', 'yellow'], ['salita', 'Salita', 'red']];
  const gabay = { street: 0, story: 0 };
  const storiesOn = (street) => Object.keys(LESSONS).filter((id) => LESSONS[id].street === STREETS[street]);
  const currentStory = () => storiesOn(gabay.street)[gabay.story];

  $('street-tabs').innerHTML = STREETS.map((s, i) =>
    `<button type="button" class="seg-btn" data-street="${i}" aria-pressed="${i === 0}">${s}</button>`).join('');
  $('street-tabs').addEventListener('click', (event) => {
    const button = event.target.closest('[data-street]');
    if (!button) return;
    goToStory(Number(button.dataset.street), 0);
  });
  $('story-prev').addEventListener('click', () => goToStory(gabay.street, gabay.story - 1));
  $('story-next').addEventListener('click', () => goToStory(gabay.street, gabay.story + 1));

  // The URL names the story (#/gabay-aralin/<story id>), so each story and its guides can be linked to.
  // The page updates right away; the hash change that follows finds nothing new to render.
  function goToStory(street, index) {
    gabay.street = street;
    gabay.story = index;
    renderGabay();
    const id = currentStory();
    const target = id ? `#/gabay-aralin/${id}` : '#/gabay-aralin';
    if (location.hash !== target) location.hash = target;
  }
  function selectStory(id) {
    gabay.street = STREETS.indexOf(LESSONS[id].street);
    gabay.story = storiesOn(gabay.street).indexOf(id);
  }

  function gabayCard(id, number) {
    const l = LESSONS[id];
    const guide = GUIDES[id];
    const thumb = guide && guide.thumb
      ? `<img class="gabay-thumb" src="assets/${guide.thumb}" alt="">`
      : `<span class="gabay-thumb gabay-thumb-empty" aria-hidden="true">Kuwento ${number}</span>`;
    const meta = l.topic
      ? `<p class="sched-meta"><span><img src="assets/icon-time.svg" alt="">${l.minutes} min</span><span><img src="assets/icon-star.svg" alt="">${l.topic}</span></p>`
      : '';
    return `
      <article class="sched gabay-card" aria-labelledby="gabay-story-title">
        <div class="sched-row">
          <img class="sched-grass" src="assets/grass.png" alt="">
          <div class="sched-left">
            ${thumb}
            <div class="sched-body">
              <p class="sched-street">${l.street}</p>
              <h2 class="sched-title" id="gabay-story-title">${l.title}</h2>
              ${meta}
            </div>
          </div>
          <div class="sched-actions">
            ${pill({ tone: 'navy', label: 'Aralin', name: `Buksan ang aralin: ${l.title}`, href: `#/aralin/${id}`, gloss: 'navy' })}
          </div>
          ${kidsArt(l.art)}
        </div>
      </article>`;
  }

  function guideBody(id) {
    const g = GUIDES[id];
    if (!g) return '<p class="empty">Malapit na ang gabay para sa kuwentong ito.</p>';
    const info = INFO_TONES.map(([key, label, tone]) => `
      <li class="info-card info-${tone}">
        <img class="info-head" src="assets/info-head-${tone}.svg" alt="">
        <img class="info-body" src="assets/info-body-${tone}.svg" alt="">
        <div class="info-text">
          <h3 class="info-title">${label}</h3>
          ${key === 'salita'
            ? `<p class="info-number"><span class="sr-only">Bilang ng salita: </span>${g.salita}</p>`
            : `<p class="info-copy">${g[key]}</p>`}
        </div>
      </li>`).join('');
    const rows = g.vocab.map(([word, meaning]) => `<tr><th scope="row">${word}</th><td>${meaning}</td></tr>`).join('');
    const signs = Object.entries(GUIDE_PARTS).map(([key, part]) => `
      <a class="jeep-sign jeep-sign-${key}" href="#/gabay-aralin/${id}/${key}">
        <img src="assets/${part.sign}" alt="${part.label}">
      </a>`).join('');
    return `
      <div class="gabay-grid">
        <div class="gabay-main">
          <ul class="info-cards">${info}</ul>
          <section class="vocab" aria-labelledby="vocab-title">
            <h2 class="vocab-title" id="vocab-title">Bokabularyong Makikita</h2>
            <table class="vocab-table"><tbody>${rows}</tbody></table>
          </section>
        </div>
        <nav class="jeep" aria-label="Mga bahagi ng aralin">
          <img class="jeep-art" src="assets/gabay-jeep.png" alt="">
          ${signs}
        </nav>
      </div>`;
  }

  let renderedGabay = null;
  function renderGabay() {
    const stories = storiesOn(gabay.street);
    gabay.story = Math.max(0, Math.min(gabay.story, stories.length - 1));
    const id = stories[gabay.story];
    // Re-rendering would replace the focused sign or button, so only redraw when the story changes
    const key = `${gabay.street}:${id}`;
    if (key === renderedGabay) return;
    renderedGabay = key;
    $('street-tabs').querySelectorAll('[data-street]').forEach((b) =>
      b.setAttribute('aria-pressed', String(Number(b.dataset.street) === gabay.street)));
    $('story-label').textContent = stories.length ? `Kuwento ${gabay.story + 1}` : 'Walang kuwento';
    $('story-prev').disabled = gabay.story <= 0;
    $('story-next').disabled = gabay.story >= stories.length - 1;
    $('gabay-body').innerHTML = id
      ? gabayCard(id, gabay.story + 1) + guideBody(id)
      : `<p class="empty">Wala pang kuwento sa ${STREETS[gabay.street]}.</p>`;
  }

  // Guide modal
  const guideDialog = $('guide-dialog');
  function openGuide(key) {
    const part = GUIDE_PARTS[key];
    const g = GUIDES[currentStory()];
    const sections = g && g[key] ? g[key] : [{ title: part.label, tone: 'green', html: '<p>Malapit na ang nilalamang ito.</p>' }];
    guideDialog.className = `guide-modal guide-${key}`;
    $('guide-sign').src = `assets/${part.sign}`;
    $('guide-sign').alt = part.label;
    $('guide-sections').innerHTML = sections.map((s) => `
      <section class="guide-section tone-${s.tone}">
        <h3 class="guide-section-title">${s.title}</h3>
        <div class="guide-text">${s.html}</div>
      </section>`).join('');
    if (!guideDialog.open) guideDialog.showModal();
    guideDialog.scrollTop = 0;
    guideDialog.querySelector('.guide-close').focus();
  }
  // Closing (×, Esc, backdrop) returns to the story's URL
  guideDialog.addEventListener('close', () => {
    const story = currentStory();
    const back = story ? `#/gabay-aralin/${story}` : '#/gabay-aralin';
    if (location.hash !== back && location.hash.startsWith('#/gabay-aralin')) location.replace(back);
  });

  // ---------- Tulong Aralin (Figma 4553:11578, 4879:2240, 4879:11109; flow 4904:9914, 4904:10273) ----------
  // Plan: date -> story id, kept in this browser. It starts empty, as in the frames.
  const TULONG_STREETS = [
    { slug: 'masipag', tone: 'green', name: 'Masipag Street' },
    { slug: 'matiyaga', tone: 'yellow', name: 'Matiyaga Street' },
    { slug: 'matatag', tone: 'red', name: 'Matatag Street' },
  ];
  const DAY_TONES = ['green', 'yellow', 'red', 'blue', 'orange'];
  const MONTHS_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  // Only the current day can be planned. On a weekend that is the coming Monday.
  const activeDay = () => {
    const now = new Date();
    const toMonday = { 6: 2, 0: 1 }[now.getDay()] || 0;
    return addDays(now, toMonday);
  };
  const weekOf = (d) => addDays(d, 1 - d.getDay());
  const tulong = { street: 0, weekStart: weekOf(activeDay()) };
  const planDialog = $('plan-dialog');
  let planDate = null; // the day the pop-up is open for
  let plan = {};
  try { plan = JSON.parse(storage.get('kuwenturo.plan')) || {}; } catch { /* ignore bad data */ }
  Object.keys(plan).forEach((d) => { if (!LESSONS[plan[d]]) delete plan[d]; });
  const dayName = (date) => {
    const d = new Date(`${date}T00:00:00`);
    return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
  };

  function renderDayCards() {
    $('tulong-week-label').textContent = weekLabel(tulong.weekStart);
    const activeDate = isoDate(activeDay());
    $('day-cards').innerHTML = DAY_TONES.map((tone, n) => {
      const day = addDays(tulong.weekStart, n);
      const date = isoDate(day);
      const name = dayName(date);
      const l = LESSONS[plan[date]];
      const isToday = date === activeDate;
      const story = l && `
            <span class="day-story-title">${l.title}</span>
            <span class="day-story-topic"><img src="assets/icon-star.svg" alt="">${l.topic}</span>`;
      let body;
      if (l && isToday) {
        body = `<button type="button" class="day-story" data-plan-day="${date}" aria-label="Palitan o alisin ang kuwento sa ${name}: ${l.title}">${story}</button>`;
      } else if (l) {
        body = `<p class="day-story">${story}</p>`;
      } else {
        body = `<button type="button" class="day-add" ${isToday ? `data-plan-day="${date}"` : 'disabled'} aria-label="Add Story sa ${name}">
            <span class="day-plus" aria-hidden="true">+</span>
            <span>Add Story</span>
          </button>`;
      }
      return `
      <li class="day-card day-${tone}${isToday ? ' is-today' : ''}"${isToday ? ' aria-current="date"' : ''}>
        <h2 class="day-name">${DAYS[day.getDay()]}</h2>
        <p class="day-date"><span>${MONTHS_SHORT[day.getMonth()]}</span>${day.getDate()}</p>
        ${body}
      </li>`;
    }).join('');
  }

  function renderStoryCards() {
    const street = TULONG_STREETS[tulong.street];
    $('street-sign').src = `assets/tulong-sign-${street.slug}.png`;
    $('street-sign').alt = street.name;
    $('story-cards').innerHTML = storiesOn(tulong.street).map((id, i) => {
      const l = LESSONS[id];
      return `
      <li class="story-card story-${street.tone}">
        <h3 class="story-number">Kuwento #${i + 1}</h3>
        <div class="story-body">
          <p class="story-title">${l.cardTitle || l.title}</p>
          <p class="story-topic">${l.topic}</p>
          <img class="story-cover" src="assets/cover-${id}.png" width="160" height="141" alt="">
          ${pill({ tone: street.tone, label: 'Piliin', name: `Piliin: ${l.title}`, attrs: `data-plan-story="${id}"` })}
        </div>
      </li>`;
    }).join('');
  }

  function saveDay(date, id) {
    if (id) plan[date] = id; else delete plan[date];
    storage.set('kuwenturo.plan', JSON.stringify(plan));
    renderDayCards();
  }

  function openPlan(date) {
    planDate = date;
    const current = plan[date];
    $('plan-title').textContent = current ? 'Palitan ang kuwento' : 'Pumili ng kuwento';
    $('plan-desc').textContent = `${dayName(date)}${current ? ` — kasalukuyan: ${LESSONS[current].title}` : ''}`;
    $('plan-submit').textContent = current ? 'Palitan' : 'Idagdag';
    $('plan-remove').hidden = !current;
    $('plan-list').querySelectorAll('label').forEach((el) => el.remove());
    $('plan-list').insertAdjacentHTML('beforeend', Object.entries(LESSONS).map(([id, l]) => `
      <label class="swap-option">
        <input type="radio" name="plan" value="${id}"${id === current ? ' checked' : ''}>
        <span>${l.title}<small>${l.street}${l.topic ? ` · ${l.topic}` : ''}</small></span>
      </label>`).join(''));
    $('plan-submit').disabled = !current;
    planDialog.showModal();
    ($('plan-list').querySelector('input:checked') || $('plan-list').querySelector('input')).focus();
  }

  // The day cards are redrawn, so focus moves to the matching button on the new card
  function focusDay(date) {
    $('day-cards').querySelector(`[data-plan-day="${date}"]`)?.focus();
  }

  function removeDay(date) {
    const title = LESSONS[plan[date]].title;
    saveDay(date, null);
    focusDay(date);
    announce(`Inalis: ${title}`);
  }

  $('day-cards').addEventListener('click', (event) => {
    const button = event.target.closest('[data-plan-day]');
    if (button) openPlan(button.dataset.planDay);
  });
  // Piliin puts the story on the current day, whichever week is showing
  $('story-cards').addEventListener('click', (event) => {
    const button = event.target.closest('[data-plan-story]');
    if (!button) return;
    const day = activeDay();
    const id = button.dataset.planStory;
    tulong.weekStart = weekOf(day);
    saveDay(isoDate(day), id);
    announce(`${dayName(isoDate(day))}: ${LESSONS[id].title}`);
  });
  $('plan-list').addEventListener('change', () => { $('plan-submit').disabled = false; });
  $('plan-remove').addEventListener('click', () => {
    planDialog.close();
    removeDay(planDate);
  });
  $('plan-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = $('plan-form').querySelector('input[name="plan"]:checked').value;
    planDialog.close();
    saveDay(planDate, id);
    focusDay(planDate);
    announce(`${dayName(planDate)}: ${LESSONS[id].title}`);
  });

  $('tulong-week-prev').addEventListener('click', () => { tulong.weekStart = addDays(tulong.weekStart, -7); renderDayCards(); });
  $('tulong-week-next').addEventListener('click', () => { tulong.weekStart = addDays(tulong.weekStart, 7); renderDayCards(); });

  // The arrows cycle through the streets; the URL names the street
  function stepStreet(step) {
    const next = TULONG_STREETS[(tulong.street + step + TULONG_STREETS.length) % TULONG_STREETS.length];
    location.hash = `#/tulong-aralin/${next.slug}`;
    announce(next.name);
  }
  $('street-prev').addEventListener('click', () => stepStreet(-1));
  $('street-next').addEventListener('click', () => stepStreet(1));

  // ---------- Guro Konek (Figma 4557:12327) ----------
  // Sent replies and Salamat marks are kept in this browser; there is no back end yet.
  // The frames give observations for Sampaguita only, so the other sections start empty.
  const GURO_SECTIONS = ['Rosal', 'Ilang-Ilang', 'Gumamela', 'Kalachuchi', 'Waling-Waling', 'Sampaguita'];
  const OBSERVED_SECTION = 'Sampaguita';
  const OBSERVATIONS = [
    { id: 'juan', tone: 'green', student: 'Juan Dela Cruz', parent: 'Marisol Dela Cruz', story: 'ang-pamilyang-puno-ng-pagmamahal', text: 'Minsan po ay nahihirapan siyang intindihin ang mga salitang hindi niya pamilyar. Mas naiintindihan niya kapag ipinapaliwanag ko ito gamit ang mga simpleng halimbawa.' },
    { id: 'joan', tone: 'yellow', student: 'Joan Santos', parent: 'Jose Santos', story: 'ang-kaniyang-munting-ngiti', text: 'Nagbasa po kami ng kuwento kagabi. Nahihirapan pa siyang alalahanin ang pagkakasunod-sunod ng mga pangyayari, kaya tinulungan ko siyang balikan ang mga larawan.' },
    { id: 'beth', tone: 'red', student: 'Beth De Leon', parent: 'Ricardo De Leon', story: 'sa-likod-ng-kompyuter', text: 'Kaya na po niyang ikuwento ang mga nangyari sa binasa namin gamit ang sarili niyang mga salita.' },
    { id: 'jun', tone: 'blue', student: 'Jun Perez', parent: 'Celia Perez', story: 'ang-timpla-ng-taho', text: 'Napansin kong mas nakakapagpokus siya kapag maikli ang babasahin at may mga larawan.' },
    { id: 'bong', tone: 'orange', student: 'Bong Maligaya', parent: 'Danilo Maligaya', story: 'ang-piraso-ng-biyaya', text: 'Kailangan pa po niya ng kaunting gabay sa pagtukoy ng problema at solusyon sa kuwento.' },
  ];
  const OBSERVATION_DATE = 'Marso 1, 2026';
  const findObservation = (id) => OBSERVATIONS.find((o) => o.id === id);
  const readList = (key) => {
    try {
      const list = JSON.parse(storage.get(key));
      return Array.isArray(list) ? list : [];
    } catch { return []; }
  };
  let sentReplies = readList('kuwenturo.tugon').filter((r) => r && typeof r.text === 'string' && r.text.trim() && typeof r.date === 'string');
  let thanked = readList('kuwenturo.salamat').filter(findObservation);
  let replyTarget = null; // the observation being answered, or null for a message to the teacher
  let guroSection = GURO_SECTIONS.indexOf(OBSERVED_SECTION);
  try {
    const chosen = GURO_SECTIONS.indexOf(JSON.parse(storage.get('kuwenturo.profile')).section);
    if (chosen >= 0) guroSection = chosen; // the section picked in the profile steps
  } catch { /* no saved profile */ }

  function infoCard({ id, tone, head, people, title, date, label, text, sent, actions }) {
    return `
      <li class="obs-card story-${tone}${id === replyTarget ? ' is-target' : ''}"${sent ? ` data-sent="${sent}" tabindex="-1"` : ''}>
        <h2 class="obs-head">${head}</h2>
        <div class="obs-body">
          <p class="obs-people">${people.join('<br>')}</p>
          <p class="obs-title">${title}</p>
          <p class="obs-date"><img src="assets/icon-time.svg" alt="">${date}</p>
          <p class="obs-label">${label}</p>
          <p class="obs-text${sent ? ' is-sent' : ''}"${sent ? ' tabindex="0"' : ''}>${text}</p>
          <div class="obs-actions">${actions}</div>
        </div>
      </li>`;
  }

  function renderObsCards() {
    const section = GURO_SECTIONS[guroSection];
    $('section-label').textContent = section;
    const replies = sentReplies.filter((r) => (r.section || OBSERVED_SECTION) === section).map((r) => {
      const o = findObservation(r.to);
      return infoCard({
        tone: o ? o.tone : 'green',
        head: 'Iyong Tugon',
        people: o ? [`Estudyante: ${o.student}`, `Magulang: ${o.parent}`] : ['Para sa: Guro'],
        title: o ? LESSONS[o.story].title : 'Mensahe sa Guro',
        date: r.date,
        label: 'Iyong tugon',
        text: escapeHtml(r.text),
        sent: escapeHtml(r.id),
        actions: pill({ tone: 'light', label: 'Alisin', name: `Alisin ang tugon: ${r.text.slice(0, 40)}`, gloss: 'light', attrs: `data-tugon-remove="${escapeHtml(r.id)}"` }),
      });
    });
    const observations = (section === OBSERVED_SECTION ? OBSERVATIONS : []).map((o) => {
      const done = thanked.includes(o.id);
      return infoCard({
        ...o,
        head: 'Naging Obserbasyon',
        people: [`Estudyante: ${o.student}`, `Magulang: ${o.parent}`],
        title: LESSONS[o.story].title,
        date: OBSERVATION_DATE,
        label: 'Obserbasyon',
        actions: pill({ tone: 'light', label: 'Tumugon', name: `Tumugon kay ${o.parent}`, gloss: 'light', attrs: `data-tugon-to="${o.id}"` })
          + pill({ tone: o.tone, label: done ? '✓ Salamat' : 'Salamat', name: `Pasalamatan si ${o.parent}`, attrs: `data-salamat="${o.id}" aria-pressed="${done}"` }),
      });
    });
    const empty = replies.length + observations.length ? [] : [`<li class="obs-empty">Wala pang obserbasyon sa ${section}.</li>`];
    $('obs-cards').innerHTML = [...replies, ...observations, ...empty].join('');
  }

  function setReplyTarget(id) {
    replyTarget = id;
    const o = findObservation(id);
    $('tugon-target').hidden = !o;
    $('tugon-target-text').textContent = o ? `Tumutugon kay ${o.parent} (${o.student})` : '';
    renderObsCards();
  }

  function clearTugonError() {
    $('tugon-error').textContent = '';
    $('tugon-text').removeAttribute('aria-invalid');
  }

  function sendTugon() {
    const text = $('tugon-text').value.trim();
    if (!text) {
      $('tugon-error').textContent = 'Mag-type muna ng mensahe bago ipadala.';
      $('tugon-text').setAttribute('aria-invalid', 'true');
      $('tugon-text').focus();
      return;
    }
    const now = new Date();
    const id = `tugon-${now.getTime()}-${sentReplies.length}`;
    sentReplies.unshift({ id, text, to: replyTarget, section: GURO_SECTIONS[guroSection], date: `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}` });
    storage.set('kuwenturo.tugon', JSON.stringify(sentReplies));
    $('tugon-text').value = '';
    $('tugon-count').textContent = '0/500';
    clearTugonError();
    setReplyTarget(null);
    $('obs-cards').scrollLeft = 0;
    $('obs-cards').querySelector(`[data-sent="${id}"]`).focus({ preventScroll: true });
    announce('Naipadala ang iyong tugon.');
  }

  // The arrows cycle through the sections
  function stepSection(step) {
    guroSection = (guroSection + step + GURO_SECTIONS.length) % GURO_SECTIONS.length;
    clearTugonError();
    setReplyTarget(null);
    $('obs-cards').scrollLeft = 0;
  }
  $('section-prev').addEventListener('click', () => stepSection(-1));
  $('section-next').addEventListener('click', () => stepSection(1));

  $('tugon-send').innerHTML = pill({ tone: 'navy', label: 'Ipadala', name: 'Ipadala ang tugon', gloss: 'navy', attrs: 'data-tugon-send' });
  $('tugon-send').addEventListener('click', sendTugon);
  $('tugon-form').addEventListener('submit', (event) => event.preventDefault());
  $('tugon-text').addEventListener('input', () => {
    $('tugon-count').textContent = `${$('tugon-text').value.length}/500`;
    clearTugonError();
  });
  $('tugon-text').addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) sendTugon();
  });
  $('tugon-target-clear').addEventListener('click', () => {
    setReplyTarget(null);
    $('tugon-text').focus();
  });
  $('obs-cards').addEventListener('click', (event) => {
    const reply = event.target.closest('[data-tugon-to]');
    const thanks = event.target.closest('[data-salamat]');
    const remove = event.target.closest('[data-tugon-remove]');
    if (reply) {
      setReplyTarget(reply.dataset.tugonTo);
      $('tugon-text').focus();
    } else if (thanks) {
      const id = thanks.dataset.salamat;
      const scroll = $('obs-cards').scrollLeft;
      thanked = thanked.includes(id) ? thanked.filter((t) => t !== id) : [...thanked, id];
      storage.set('kuwenturo.salamat', JSON.stringify(thanked));
      renderObsCards();
      $('obs-cards').scrollLeft = scroll;
      $('obs-cards').querySelector(`[data-salamat="${id}"]`).focus({ preventScroll: true });
      if (thanked.includes(id)) announce(`Napasalamatan si ${findObservation(id).parent}.`);
    } else if (remove) {
      sentReplies = sentReplies.filter((r) => r.id !== remove.dataset.tugonRemove);
      storage.set('kuwenturo.tugon', JSON.stringify(sentReplies));
      renderObsCards();
      $('tugon-text').focus({ preventScroll: true });
      announce('Inalis ang tugon.');
    }
  });

  // ---------- Lakbay Aralin ----------
  // #/lakbay-aralin → start; /saan-patungo → pick a street; /<street> → its stories
  const LK_STREETS = [
    { slug: 'masipag', name: 'Masipag', street: 'Masipag St.', tone: 'green', light: 1 },
    { slug: 'matiyaga', name: 'Matiyaga', street: 'Matiyaga St.', tone: 'yellow', light: 2 },
    { slug: 'matatag', name: 'Matatag', street: 'Matatag St.', tone: 'red', light: 3 },
  ];
  // The Aralin line and art of each story card, in the frames' Kuwento #1–#10 order
  const LK_STORY_ORDER = Object.keys(LESSONS);
  const LK_ARALIN = [
    'Detalye ng Kuwento', 'Detalye ng Kuwento', 'Ang Damdamin ng Tauhan', 'Ang Damdamin ng Tauhan',
    'Sanhi at Bunga', 'Sanhi at Bunga', 'Problema at Solusyon', 'Problema at Solusyon',
    'Sanhi at Bunga', 'Problema at Solusyon',
  ];
  const LK_TONES = {
    green: { head: '#0C9358', body: '#04673C', pill: 'green' },
    yellow: { head: '#FFBE33', body: '#FFBE33', pill: 'yellow' },
    red: { head: '#B42224', body: '#B52325', pill: 'red' },
    blue: { head: '#2478FF', body: '#2478FF', pill: 'blue' },
  };
  const LK_DESIGN = {
    'lk-start': { x: 189, w: 1011, bg: [-66, 0, 1496, 1034] },
    'lk-saan': { x: 0, w: 1200, bg: [-93, -180, 1374, 1259] },
    'lk-street': { x: 0, w: 1200, bg: [-52, -52, 1289, 1117] },
    'lk-steps': { x: 0, w: 1200, bg: null },
    'lk-bb': { x: 0, w: 1200, bg: [0, 0, 1200, 900] },
  };
  // Story cards and step signs built so far; other stories keep the "malapit na" page
  const LK_DETAIL = {
    'ang-pamilyang-puno-ng-pagmamahal': {
      art: 'assets/lakbay/story-k01-card.jpg',
      salita: '104 Salita',
      aral: 'Mahalaga ang pagmamahalan, pag-aaruga, at pag-unawa sa bawat miyembro ng pamilya upang manatiling masaya at nagkakaisa ang pamilya.',
      paksa: 'Pagmamahalan, Pag-aaruga, at Pagkakaunawaan sa Pamilya',
    },
  };
  const LK_STEPS = [
    { slug: 'bago-basahin', tone: 'green', title: 'Bago Basahin', lines: ['BAGO', 'BASAHIN'], note: 'Maghanda bago basahin ang kuwento' },
    { slug: 'ang-babasahin', tone: 'yellow', title: 'Ang Babasahin', lines: ['ANG', 'BABASAHIN'], note: 'Basahin at intindihin ang kuwento' },
    { slug: 'pagkatapos-basahin', tone: 'red', title: 'Pagkatapos Basahin', lines: ['PAGKATAPOS', 'BASAHIN'], note: 'Sagutan ang mga gawain at magbuod' },
  ];
  const lkPhone = window.matchMedia('(max-width: 700px), (max-width: 900px) and (max-height: 500px)');
  let lkScene = null;

  // The frames are one 1200 × 900 picture, so the desktop screens scale as a whole to fit
  function lkFit() {
    if (!lkScene) return;
    const scene = $(lkScene);
    const stages = scene.querySelectorAll('.lk-stage');
    const bg = scene.querySelector('.lk-bg');
    if (lkScene === 'lk-tall') {
      const stageT = stages[0];
      const sT = lkPhone.matches ? 0 : scene.clientWidth / 1200;
      stageT.style.transform = sT ? `translateX(${(scene.clientWidth - 1200 * sT) / 2}px) scale(${sT})` : '';
      $('bb-tall-size').style.height = sT ? `${3650 * sT}px` : '';
      return;
    }
    if (lkScene === 'lk-tk') {
      // Inside the room the art and the pieces move as one and cover the window; the instructions fit it
      const W = scene.clientWidth;
      const H = scene.clientHeight;
      const fit = Math.min(W / 1182, H / 887);
      scene.style.setProperty('--tk-s', fit);
      scene.style.setProperty('--tk-z', (W - 32) / 1182);
      if (!tkState.room && lkPhone.matches) { stages[0].style.transform = ''; return; }
      if (tkState.room && lkPhone.matches) { stages[0].style.transform = `translate(0, 72px) scale(${W / 1182})`; return; }
      // Upright windows fit the room instead, or the pieces at its sides would fall off the screen
      const wide = W / H >= 1182 / 887;
      const s = tkState.room && wide ? W / 1182 : fit;
      const y = tkState.room && wide ? -Math.min(TK_ROOM_TOP, 887 - H / s) * s : (H - 887 * s) / 2;
      stages[0].style.transform = `translate(${(W - 1182 * s) / 2}px, ${y}px) scale(${s})`;
      return;
    }
    if (lkPhone.matches) {      stages.forEach((stage) => { stage.style.transform = ''; });
      $('st-art').style.transform = '';
      if (bg) bg.style.cssText = '';
      return;
    }
    const d = LK_DESIGN[lkScene];
    const W = scene.clientWidth;
    const H = scene.clientHeight;
    if (lkScene === 'lk-story') {
      // The illustration covers the window and the box takes the bottom 37.5%. Each picture ends in white
      // (abState.white, frame units), so a picture that ends high is enlarged until the box hides that.
      const sA = Math.max(W / 1200, H / 900, H * AB_BOX / (abState.white - abState.oy));
      const up = Math.min(abState.oy, 900 - H / sA);
      $('st-art').style.transform = `translate(${(W - 1200 * sA) / 2}px, ${-up * sA}px) scale(${sA})`;
      const sS = Math.min(W / 1200, H / 900);
      const y0 = abState.sub ? H - 900 * sS : H * 478 / 900 - 478 * sS;
      stages[0].style.transform = `translate(${(W - 1200 * sS) / 2}px, ${y0}px) scale(${sS})`;
      // The words sit in the middle of the box, below its grey rim
      stages[0].style.setProperty('--st-mid', `${(H * AB_MID - y0) / sS}px`);
      return;
    }
    if (lkScene === 'lk-bb') {
      // One scale and one origin for the art and everything on it, so nothing drifts off its background
      const [ax, ay, aw, ah] = d.bg;
      const sB = Math.max(Math.min(W / 1200, H / 900), W / aw, H / (900 - ay));
      const left = (W - 1200 * sB) / 2;
      const top = H - 900 * sB;
      stages.forEach((stage) => { stage.style.transform = `translate(${left}px, ${top}px) scale(${sB})`; });
      bg.style.cssText = `left:${left + ax * sB}px;top:${top + ay * sB}px;width:${aw * sB}px;height:${ah * sB}px`;
      return;
    }
    const s = Math.min(W / d.w, H / 900);
    const ox = (W - d.w * s) / 2 - d.x * s;
    const oy = H - 900 * s; // tall windows keep the road at the bottom, extra sky on top
    stages.forEach((stage) => { stage.style.transform = `translate(${ox}px, ${oy}px) scale(${s})`; });
    scene.style.setProperty('--lk-panel-top', `${oy + 426 * s}px`);
    if (!d.bg) return;
    // The art stops just past the frame: enlarge it only as far as the window needs
    const [bx, by, bw, bh] = d.bg;
    const k = Math.max(1, W / (bw * s), H / (bh * s));
    const w = bw * s * k;
    const h = bh * s * k;
    const cx = W / 2 + (bx + bw / 2 - (d.x + d.w / 2)) * s;
    const left = Math.min(0, Math.max(W - w, cx - w / 2));
    const top = Math.min(0, Math.max(H - h, oy + by * s));
    bg.style.cssText = `left:${left}px;top:${top}px;width:${w}px;height:${h}px`;
  }

  function lkShow(sceneId) {
    const changed = lkScene !== sceneId;
    ['lk-start', 'lk-saan', 'lk-street', 'lk-steps', 'lk-bb', 'lk-tall', 'lk-story', 'lk-tk'].forEach((id) => { $(id).hidden = id !== sceneId; });
    lkScene = sceneId;
    document.body.classList.add('lk-on');
    const full = sceneId !== 'lk-start';
    document.body.classList.toggle('lk-full-on', full);
    // Full-screen scenes cover the menu, so it leaves the tab order too
    $('sidebar').inert = full;
    document.querySelector('.topbar').inert = full;
    lkFit();
    return changed;
  }
  function lkHide() {
    lkScene = null;
    document.body.classList.remove('lk-on', 'lk-full-on');
    $('sidebar').inert = false;
    document.querySelector('.topbar').inert = false;
  }

  function lkStreetStories(street) {
    return LK_STORY_ORDER.filter((id) => LESSONS[id].street === street.street);
  }
  // The street's own story card, as in the Lakbay street frames (1116:23897, 1116:24680, 1116:25463):
  // the same card Tulong Aralin uses, in the street's colour
  function lkCard(id, tone) {
    const n = LK_STORY_ORDER.indexOf(id) + 1;
    const l = LESSONS[id];
    const no = lkStreetStories(LK_STREETS.find((s) => s.street === l.street)).indexOf(id) + 1;
    return `<li class="story-card story-${tone}" data-story="${n}">
      <h2 class="story-number">Kuwento #${no}</h2>
      <div class="story-body">
        <p class="story-title">${l.cardTitle || escapeHtml(l.title)}</p>
        <p class="story-topic">${l.topic}</p>
        <img class="story-cover" src="assets/cover-${id}.png" width="160" height="141" alt="" loading="lazy">
        ${pill({ tone, label: 'Piliin', name: `Piliin ang ${l.title}`, href: `#/lakbay-aralin/kuwento/${id}` })}
      </div>
    </li>`;
  }
  function lkRenderStreet(street) {
    const at = LK_STREETS.indexOf(street);
    const prev = LK_STREETS[(at + LK_STREETS.length - 1) % LK_STREETS.length];
    const next = LK_STREETS[(at + 1) % LK_STREETS.length];
    $('lk-street-title').textContent = `KUWENTONG ${street.name.toUpperCase()}`;
    $('lk-prev').href = `#/lakbay-aralin/${prev.slug}`;
    $('lk-prev').setAttribute('aria-label', `Nakaraang kalye: ${prev.street}`);
    $('lk-next').href = `#/lakbay-aralin/${next.slug}`;
    $('lk-next').setAttribute('aria-label', `Susunod na kalye: ${next.street}`);
    const stories = lkStreetStories(street);
    $('lk-cards').innerHTML = stories.map((id) => lkCard(id, street.tone)).join('');
  }

  $('lk-go').innerHTML = pill({ tone: 'blue', label: 'Simulan', name: 'Simulan ang Lakbay Aralin', href: '#/lakbay-aralin/saan-patungo' });
  $('lk-signs').innerHTML = LK_STREETS.map((s) => `
    <a class="lk-sign lk-sign-${s.tone}" href="#/lakbay-aralin/${s.slug}" aria-label="${s.name} Street">
      <span class="lk-sign-text"><b>${s.name.toUpperCase()}</b> STREET</span>
      <img src="assets/lakbay/light-${s.light}.png" width="144" height="62" alt="">
    </a>`).join('');

  // ---------- Lakbay: Bago Basahin (LAKBAY-INTERFACE 913:3399) ----------
  // #/lakbay-aralin/kuwento/<id>/bago-basahin/<screen>; the arrows walk BB_ORDER, the X closes a pop-up
  const BB_ORDER = ['simula', 'alam-1', 'panimula', 'alam-2', 'bokabularyo', 'tungkol-saan', 'hulaan', 'handa'];
  // [back, next] for each full screen; null next ends on the three steps
  const BB_LINKS = {
    'alam-1': ['simula', 'panimula'],
    'alam-2': ['alam-1', 'bokabularyo'],
    bokabularyo: ['alam-2', 'tungkol-saan'],
    'tungkol-saan': ['bokabularyo', 'hulaan'],
    handa: ['tungkol-saan', null],
  };
  const BB_TONES = {
    red: { sign: ['#AF0414', '#E43D45', '#AF0414'], line: '#B42224' },
    orange: { sign: ['#F36800', '#EF9163', '#F36800'], line: '#F36800' },
    green: { sign: ['#136C39', '#29BF68', '#136C39'], line: '#136C39' },
    blue: { sign: ['#0476BB', '#6EAFE5', '#0476BB'], line: '#0476BB' },
    purple: { sign: ['#550868', '#9D4CB1', '#550868'], line: '#550868' },
    navy: { sign: ['#001343', '#002581', '#001343'], line: '#001343' },
  };
  const BB_STORY = {
    'ang-pamilyang-puno-ng-pagmamahal': {
      misyon: 'Alamin na may iba’t ibang uri ng pamilya at tuklasin na ang pagmamahal, pag-aalaga, at pagtanggap ang mahalagang bumubuo sa isang pamilya.',
      layunin: [
        'Ang mga detalye ng kuwento na nagpapakita ng pagmamahal at pag-aalaga ng pamilya.',
        'Ang aral ng kuwento tungkol sa pagtanggap at paggalang sa iba’t ibang uri ng pamilya.',
        'Ang mga pangunahing tauhan, tagpuan, at mahahalagang pangyayari sa kuwento.',
        'Ang pagkakasunod-sunod ng mahahalagang pangyayari mula simula, gitna, at wakas.',
      ],
      alam: 'Ang bawat bata ay may iba’t ibang uri ng pamilya at paraan ng pagmamahal',
      panimula: 'Ano ang pagkakapareho ng lahat ng pamilya kahit iba-iba ang kanilang kasama sa bahay?',
      salita: [
        { slug: 'pamilya', button: 'WHEELCHAIR', word: 'PAMILYA', tone: 'red', kahulugan: 'Mga taong nagmamahalan at nag-aalaga sa isa\'t isa.', kategorya: 'Pangngalan / Pangngalang Pambalana', halimbawa: 'Mahal ko ang aking pamilya.' },
        { slug: 'barangay', button: 'TALENTO', word: 'BARANGAY', tone: 'orange', kahulugan: 'Lugar kung saan nakatira ang mga tao at pamilya.', kategorya: 'Pangngalan / Pangngalang Pambalana', halimbawa: 'Nakatira kami sa isang barangay na malapit sa aming paaralan.' },
        { slug: 'nagtataka', button: 'HADLANG', word: 'NAGTATAKA', tone: 'green', kahulugan: 'Nag-isip kung bakit o paano nangyari ang isang bagay / Gustong malaman ang isang bagay.', kategorya: 'Pandiwa', halimbawa: 'Nagtataka ako kung bakit hindi papasok sa paaralan ang aking kaibigan.' },
        { slug: 'umiling', button: 'ROSARYO', word: 'UMILING', tone: 'blue', kahulugan: 'Paggalaw ng ulo upang ipakita ang hindi pagpayag o hindi pagsang-ayon.', kategorya: 'Pandiwa', halimbawa: 'Umiiling si Biboy nang tanungin siya kung gusto niyang sumama.' },
        { slug: 'naunawaan', button: 'PAGLIKHA', word: 'NAUNAWAAN', tone: 'purple', kahulugan: 'Naiintindihan ang isang bagay.', kategorya: 'Pandiwa', halimbawa: 'Nauunawaan ni Biboy ang kuwento dahil binasa niya itong mabuti.' },
      ],
      hulaan: {
        tanong: 'Batay sa larawan, tungkol saan ang kwento?',
        pagpipilian: [
          { text: 'Matutuklasan ni Biboy na kahit iba ang pamilya ni Popoy, puno pa rin ito ng pagmamahal.', tama: true },
          { text: 'Matutuklasan ni Biboy na kinakahiya ni Popoy ang kanyang pamilya.', tama: false },
          { text: 'Matutuklasan ni Biboy na walang pamilyang nag-aalaga kay Popoy.', tama: false },
        ],
      },
      handa: 'Nakarating na tayo sa bahay ni Popoy. Tara na’t basahin ang kuwentong naghihintay!',
    },
  };
  const BB_ART = 'assets/lakbay/bago/';
  const bbImg = (file, x, y, w, h, keep = '') => `<img class="bb-art ${keep}" src="${BB_ART}${file}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px" alt="">`;
  const bbDash = (w, h, r, sw, gap, color = '#001343') => `<svg class="lk-dash" viewBox="0 0 ${w} ${h}" aria-hidden="true"><rect x="${sw / 2}" y="${sw / 2}" width="${w - sw}" height="${h - sw}" rx="${r}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-dasharray="${gap}"/></svg>`;
  function bbPlate(x, y, w, h, fs, text) {
    const r = h * 0.09;
    return `<div class="lk-plate bb-plate" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r}px;font-size:${fs}px;line-height:${fs}px">
      <span class="bb-dash" style="left:${h * 0.083}px;top:${h * 0.083}px;width:${w - h * 0.166}px;height:${h * 0.834}px">${bbDash(w - h * 0.166, h * 0.834, r * 0.95, h * 0.03, h * 0.14)}</span>
      <p style="width:${w - h * 0.5}px">${text}</p></div>`;
  }
  function bbTitle(x, y, scale, fs, text, id = 'bb-title') {
    return `<div class="lk-title bb-title" style="left:${x}px;top:${y}px;scale:${scale}">
      <i class="lk-tab lk-tab-1"></i><i class="lk-tab lk-tab-2"></i>
      <div class="lk-title-board"><h1 id="${id}" tabindex="-1" style="font-size:${fs}px">${text}</h1>
      <svg class="lk-dash" viewBox="0 0 696.2 119.6" preserveAspectRatio="none" aria-hidden="true"><rect x="1.25" y="1.25" width="693.7" height="117.1" fill="none" stroke="#FFFBF4" stroke-width="2.5" stroke-dasharray="19.2"/></svg></div></div>`;
  }
  function bbCloseTab(href, x, y, label) {
    return `<a class="lk-m-close bb-close" href="${href}" aria-label="${label}" style="left:${x}px;top:${y}px"><svg viewBox="0 0 75.3 54" aria-hidden="true"><defs><linearGradient id="bb-tab-red" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#C9373C"/><stop offset="1" stop-color="#9D0A0A"/></linearGradient></defs><path d="M75.31 45.67V17.03C75.31 13.32 72.88 10.06 69.33 9L40.17.35C38.62-.11 36.97-.12 35.42.34L6 9.01C2.44 10.06 0 13.33 0 17.04V45.67C0 50.29 3.75 54.03 8.37 54.03H66.95C71.57 54.03 75.31 50.29 75.31 45.67Z" fill="url(#bb-tab-red)"/><g fill="none" stroke="#FFFBF4" stroke-width="3.1"><circle cx="37.6" cy="28" r="14"/><path d="M33 23.4l9.3 9.3M42.3 23.4l-9.3 9.3"/></g></svg></a>`;
  }
  function bbSign(x, y, w, h, tone, text, fs) {
    const [a, b, c] = BB_TONES[tone].sign;
    const id = `bb-sign-${tone}`;
    const low = h * 0.684;
    return `<div class="lk-m-sign bb-sign" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="${id}"><stop stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs>
        <path d="M0 0H${w}V${low}L${w / 2} ${h}L0 ${low}Z" fill="url(#${id})"/>
        <path d="M1.6 1.6H${w - 1.6}V${low - 1.5}L${w / 2} ${h - 1.6}L1.6 ${low - 1.5}Z" fill="none" stroke="#FFFBF4" stroke-width="3.14" stroke-dasharray="24"/>
      </svg>
      <h1 id="bb-card-title" tabindex="-1" style="font-size:${fs}px;line-height:${h * 0.68}px;padding-top:0">${text}</h1></div>`;
  }
  const bbTabs = (x, y, w1, tone) => {
    const bg = `background:linear-gradient(0deg, ${BB_TONES[tone].sign.join(',')})`;
    return `<i class="lk-tab bb-tab" style="left:${x}px;top:${y}px;width:${w1}px;height:${w1 * 0.8}px;${bg}"></i><i class="lk-tab bb-tab" style="left:${x + w1 * 0.75}px;top:${y + 4}px;width:${w1 * 0.54}px;height:${w1 * 0.83}px;${bg}"></i>`;
  };
  const bbPanel = (x, y, w, h, dx, dy, dw, dh, line) => `<div class="bb-panel" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><span class="bb-dash" style="left:${dx - x}px;top:${dy - y}px;width:${dw}px;height:${dh}px">${bbDash(dw, dh, 30, 5.2, 24, line)}</span></div>`;
  const bbHead = (x, y, w) => `<img class="bb-head" src="assets/lakbay/k1-head.png" style="left:${x}px;top:${y}px;width:${w}px;height:${w * 0.714}px" alt="">`;

  const bbState = { story: null, screen: null, picked: null };
  const bbUrl = (id, screen) => `#/lakbay-aralin/kuwento/${id}/bago-basahin/${screen}`;
  const bbSteps = (id) => `#/lakbay-aralin/kuwento/${id}/hakbang`;

  const bbBubble = (text, id = 'bb-bubble-clip') => `<div class="bb-bubble"><svg class="bb-tail" viewBox="0 0 852 245" aria-hidden="true"><defs><clipPath id="${id}"><path d="M30 0H822Q852 0 852 30V160Q852 190 822 190H207L148 245L87 190H30Q0 190 0 160V30Q0 0 30 0Z"/></clipPath></defs><g clip-path="url(#${id})"><rect width="852" height="245" fill="#C9C7C2"/><path transform="translate(10 10)" fill="#FFFBF4" d="M30 0H822Q852 0 852 30V160Q852 190 822 190H207L148 245L87 190H30Q0 190 0 160V30Q0 0 30 0Z"/></g></svg><p>${text}</p></div>`;

  function bbScene(id, screen) {
    const s = BB_STORY[id];
    const alam = () => bbPlate(221, 175.3, 759, 112.3, 30, s.alam) + bbTitle(253.5, 41.1, 1, 75, 'ALAM MO BA?');
    if (screen === 'alam-1' || screen === 'panimula') {
      return { bg: ['bg-alam.jpg', [-520, -700, 2240, 1600]], html: alam()
        + bbImg('family1.png', 217, 327, 263, 415) + bbImg('nanay1.png', 732, 373, 220, 360)
        + bbImg('biboy-think.png', 480, 371, 239, 437, 'bb-keep') + bbImg('jeep.png', 924, 290, 1647.5, 599.5) };
    }
    if (screen === 'alam-2') {
      return { bg: ['bg-alam.jpg', [-520, -700, 2240, 1600]], html: alam()
        + bbImg('biboy-ride.png', 662, 276, 1853.5, 607) + bbImg('nanay2.png', 491, 385, 217.5, 360)
        + bbImg('family2.png', 234, 327, 258, 417.5, 'bb-keep') };
    }
    if (screen === 'bokabularyo' || screen.startsWith('salita-')) {
      const cols = s.salita.map((w, i) => `<a class="bb-word bb-t-${w.tone}" href="${bbUrl(id, `salita-${w.slug}`)}" style="top:${164 + 92 * i}px" aria-label="${w.button}: alamin ang ibig sabihin">${w.button}</a>`).join('');
      return { bg: ['bg-boka.jpg', [-520, -700, 2240, 1600]], html: bbPlate(118, 134.4, 572, 83.6, 22.3, 'Pindutin ang mga salitang mababasa sa kuwento upang malaman ang kanilang ibig sabihin')
        + bbTitle(142.5, 34.2, 0.7535, 78, 'BOKABULARYO') + bbImg('spark-boka.png', 356, 226, 119.7, 118.2) + bbImg('jeep.png', -979, 290, 1647.5, 599.5)
        + bbImg('biboy-sit.png', 200, 246, 265.5, 367.5, 'bb-keep')
        + `<div class="bb-words">${cols}</div>` };
    }
    if (screen === 'hulaan') {
      return { bg: ['bg-hulaan.jpg', [-520, -700, 2240, 1600]], html: bbImg('biboy-peek.png', 0, 359, 242, 443.8) + bbImg('popoy.png', 526, 14, 206, 228)
        + bbImg('story-card.png', 401.7, 189.3, 416.8, 460.3, 'bb-keep bb-under') + bbImg('tita-a.png', 272, 173, 188, 480) + bbImg('tita-b.png', 718, 165, 271.7, 545)
        + bbPlate(219, 718, 762, 111.3, 30, 'Hulaan natin kung tungkol saan ang kuwento') + bbTitle(251.6, 584.7, 1, 73, 'TUNGKOL SAAN?') };
    }
    if (screen === 'tungkol-saan') {
      return { bg: ['bg-tungkol.jpg', [-520, -700, 2240, 1600]], html: bbImg('popoy.png', 526, 14, 206, 228)
        + bbImg('story-card.png', 401.7, 189.3, 416.8, 460.3, 'bb-keep bb-under') + bbImg('tita-a.png', 272, 173, 188, 480) + bbImg('tita-b.png', 718, 165, 271.7, 545)
        + bbPlate(219, 718, 762, 111.3, 30, 'Hulaan natin kung tungkol saan ang kuwento') + bbTitle(251.6, 584.7, 1, 73, 'TUNGKOL SAAN?')
        + bbImg('biboy-stand.png', 20, 426, 254, 364, 'bb-top') };
    }
    return { bg: ['bg-handa.jpg', [-520, -700, 2240, 1600]], html: `${bbBubble(s.handa)}
        <div class="bb-handa-sign">${bbSign(409, 64, 702, 80, 'navy', 'HANDA NA BA?', 47)}</div><img class="bb-art bb-keep" src="${TK_ART}biboy-kaway.png" style="left:24.4px;top:181.7px;width:524.3px;height:865.4px" alt="">` };
  }

  function bbModal(id, screen) {
    const s = BB_STORY[id];
    if (screen === 'panimula') {
      return bbHead(491, 91, 226) + bbTabs(71.5, 247.9, 112, 'navy') + bbCloseTab(bbUrl(id, 'alam-2'), 1041, 238, 'Isara ang Panimula')
        + bbPanel(49, 279.4, 1094, 415.6, 78, 302.7, 1035, 370.7, '#001343')
        + `<div class="bb-bar bb-bar-big"><svg class="bb-bar-shape" viewBox="0 0 1161 209.5" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="bb-bar-fill"><stop stop-color="#001343"/><stop offset=".48" stop-color="#002581"/><stop offset=".93" stop-color="#001343"/></linearGradient></defs><path fill="#FFFBF4" d="M30 0H1131Q1161 0 1155.78 29.55L1129.22 179.95Q1124 209.5 1094 209.5H57.67Q27.67 209.5 23.74 179.76L3.93 29.74Q0 0 30 0Z"/><path fill="url(#bb-bar-fill)" d="M31.41 10H1129.07Q1149.07 10 1145.59 29.7L1119.08 179.8Q1115.6 199.5 1095.6 199.5H56.44Q36.44 199.5 33.82 179.67L14.03 29.83Q11.41 10 31.41 10Z"/></svg><p>${s.panimula}</p></div><img class="bb-pic" src="${BB_ART}panimula.jpg" style="left:78px;top:354.5px;width:252px;height:290.7px" alt="Ang iba't ibang pamilya sa barangay">`
        + bbSign(241, 249, 711, 90, 'navy', 'PANIMULA', 47);
    }
    if (screen === 'hulaan') {
      const q = s.hulaan;
      const done = bbState.picked !== null;
      const opts = q.pagpipilian.map((o, i) => {
        const cls = !done ? '' : (o.tama ? ' is-tama' : ' is-mali');
        const mark = !done ? '' : `<b class="bb-mark">${o.tama ? '✓ Tama' : '✗ Mali'}</b>`;
        const [a, b, c] = BB_TONES[!done ? 'navy' : (o.tama ? 'green' : 'red')].sign;
        const shape = `<svg class="bb-opt-shape" viewBox="0 0 1148.9 124.8" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="bb-opt-fill-${i}"><stop stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><path fill="#FFFBF4" d="M28 0H1120.87Q1148.87 0 1140.99 26.87L1120.15 97.97Q1112.27 124.84 1084.27 124.84H55.38Q27.38 124.84 21.38 97.49L6 27.35Q0 0 28 0Z"/><path fill="url(#bb-opt-fill-${i})" d="M31.43 10H1116.52Q1135.52 10 1130.17 28.23L1110.13 96.61Q1104.78 114.84 1085.78 114.84H54.42Q35.42 114.84 31.35 96.28L16.5 28.56Q12.43 10 31.43 10Z"/></svg>`;
        return `<button type="button" class="bb-opt${cls}" data-opt="${i}" style="top:${373.6 + 148.8 * i}px"${done ? ' aria-disabled="true"' : ''}>${shape}<span>${o.text}</span>${mark}</button>`;
      }).join('');
      return bbHead(514, 41, 231) + bbTabs(85, 214, 106, 'navy') + bbCloseTab(bbUrl(id, 'handa'), 1033, 193, 'Isara ang Hulaan')
        + bbPanel(39, 235, 1114, 530, 69.5, 265, 1052.4, 472.3, '#001343')
        + `<p class="bb-q" id="bb-q">${q.tanong}</p><div class="bb-opts" role="group" aria-labelledby="bb-q">${opts}</div>
          <img class="bb-pic bb-pic-big" src="${BB_ART}hulaan.jpg" style="left:32.6px;top:307.9px;width:378.2px;height:480px" alt="Si Popoy kasama ang kanyang pamilya">`
        + bbSign(242, 203.7, 775, 93.5, 'navy', 'HULAAN', 50);
    }
    const w = s.salita.find((x) => `salita-${x.slug}` === screen);
    if (!w) return '';
    const row = (label, text, i) => `<div class="bb-row" style="top:${372.6 + 100.5 * i}px"><span class="bb-label bb-t-${w.tone}">${label}</span><p>${escapeHtml(text)}</p></div>`;
    return bbHead(490, 89, 236) + bbTabs(44, 263, 117, w.tone) + bbCloseTab(bbUrl(id, 'bokabularyo'), 1065, 243, 'Isara ang salita')
      + bbPanel(27, 286, 1145, 435, 57.4, 310.5, 1083.3, 388, BB_TONES[w.tone].line)
      + row('KAHULUGAN', w.kahulugan, 0) + row('KATEGORYA', w.kategorya, 1) + row('HALIMBAWA', w.halimbawa, 2)
      + bbSign(228, 254.4, 744, 94, w.tone, w.word, 47);
  }

  function bbNav(id, screen) {
    // Pop-ups dim the arrows like the frames: their X is the way on
    const links = BB_LINKS[screen];
    const stage = $('bb-nav');
    stage.inert = !links;
    stage.classList.toggle('is-dim', !links);
    if (!links) return;
    const last = links[1] === null;
    $('bb-prev').href = bbUrl(id, links[0]);
    $('bb-next').href = last ? abUrl(id) : bbUrl(id, links[1]);
    $('bb-prev').setAttribute('aria-label', 'Nakaraan');
    $('bb-next').setAttribute('aria-label', last ? 'Susunod: Ang Basahin' : 'Susunod');
  }

  // Bago Basahin and Ang Basahin share one tall page; only the words and the sign colour change
  function tallFill({ tone, no, board, title, note = 'Maghanda bago basahin ang kuwento', head1, text1, head2, lead, items = [], gawain = '', next, back }) {
    $('lk-tall').classList.toggle('is-ang', tone === 'ang');
    $('lk-tall').classList.toggle('is-pk', tone === 'pk');
    $('bb-tall-note').textContent = note;
    $('bb-tall-gawain').innerHTML = gawain;
    $('bb-tall-gawain').hidden = !gawain;
    $('bb-tall-no').textContent = no;
    $('bb-tall-board').innerHTML = board;
    $('bb-tall-title').textContent = title;
    $('bb-misyon-h').textContent = head1;
    $('bb-tall-misyon').textContent = text1;
    $('bb-layunin-h').textContent = head2;
    $('bb-tall-lead').textContent = lead;
    $('bb-tall-layunin').innerHTML = items.map((t) => `<li><svg viewBox="0 0 86 86" aria-hidden="true"><path d="M43 2l12.6 25.5 28.2 4.1-20.4 19.9 4.8 28.1L43 66.4 17.8 79.6l4.8-28.1L2.2 31.6l28.2-4.1z" fill="#FFBE33"/></svg><span>${t}</span></li>`).join('');
    $('bb-tall-prev').href = back;
    $('bb-tall-next').href = next;
  }
  function bbRenderTall(id) {
    const s = BB_STORY[id];
    tallFill({ tone: 'bb', no: '1', board: 'BAGO<br>BASAHIN', title: 'Bago Basahin', head1: 'MISYON', text1: s.misyon, head2: 'LAYUNIN',
      lead: 'Sa pagtatapos ng aralin, ito ang mga inaasahang matutukoy ng mga mag-aaral:', items: s.layunin, back: bbSteps(id), next: bbUrl(id, 'alam-1') });
  }

  // ---------- Lakbay: Ang Basahin (LAKBAY-INTERFACE 965:50723, story 1012:4296) ----------
  // #/lakbay-aralin/kuwento/<id>/ang-basahin page, then .../ang-babasahin/<page>; each page is one frame.
  // A page with `spot` has a highlighted part that opens <page>-tanong; Next on the page itself skips it.
  const AB_ART = 'assets/lakbay/kuwento/';
  const AB_STORY = {
    'ang-pamilyang-puno-ng-pagmamahal': {
      paalala: 'Ang kuwentong ito ay tungkol sa uri ng pamilya at pagmamahal. Hindi ito naglalayong magturo ng anumang hindi angkop para sa mga bata.',
      lead: 'Habang nagbabasa ng kuwento, ito ang mga inaasahang gawin ng mga mag-aaral:',
      tandaan: [
        'Tingnan at sundan ang mga salita habang nagbabasa.',
        'Huwag magmadali para mas maintindihan ang kuwento.',
        'Isipin kung ano ang ibig sabihin ng mga pangyayari.',
        'Alalahanin ang mga aral at mahahalagang pangyayari.',
      ],
      pamagat: 'ANG PAMILYANG PUNONG-PUNO NG PAGMAMAHAL',
      pahina: [
        { f: 'f0', oy: 120 },
        { f: 'f1', w: 540, t: 'Habang naglalakad sa aming barangay, nakita ko ang kaibigan kong si Popoy.' },
        { f: 'f2', t: '<em>“Popoy! Papasok ka na ba sa paaralan? Sabay na tayo!”</em> tawag ko.<br><em>“Hindi. Aalis kami ng mga mama ko,”</em> sagot niya.' },
        { f: 'f3', t: '<em>“Mga mama? Hindi ba mama at papa ang bumubuo ng pamilya?”</em> pagtataka ko.', spot: [416, 0, 365, 478, 'Si Biboy na nagtataka'], tanong: 'Anong emosyon kaya ito?<br>Ipakita mo rin!' },
        { f: 'f4', t: '<em>“Mga mama? Hindi ba mama at papa ang bumubuo ng pamilya?”</em> pagtataka ko.' },
        { f: 'f5', t: 'Umiling si Popoy.<br><em>“Dalawa ang mama ko.”</em>' },
        { f: 'f6', t: '<em>“Dalawa ang mama ko at mahal na mahal nila ako.”</em>' },
        { f: 'f7', w: 530, t: '<em>“Kapag nalulungkot ako, niyayakap nila ako.”</em>' },
        { f: 'f8', t: '<em>“Kapag nalulungkot ako, niyayakap nila ako.”</em>' },
        { f: 'f9', t: '<em>“Kapag may sakit ako, inaalagaan nila ako.”</em>' },
        { f: 'f10', t: '<em>“Kapag nahihirapan ako, tinutulungan nila ako.”</em>' },
        { f: 'f11', oy: 50, t: '<em>“Kapag nahihirapan ako, tinutulungan nila ako.”</em>', spot: [265, 0, 730, 478, 'Si Popoy at ang kanyang dalawang mama'], tanong: 'Mahal ba ng dalawang<br>mama si Popoy?' },
        { f: 'f13', t: 'Lumabas ang dalawang mama niya at niyakap siya.' },
        { f: 'f14', w: 525, t: 'Lumabas ang dalawang mama niya at niyakap siya.' },
        { f: 'f15', oy: 40, w: 528, t: 'Lumabas ang dalawang mama niya at niyakap siya.' },
        { f: 'f16', w: 528, t: 'Lumabas ang dalawang mama niya at niyakap siya.' },
        { f: 'f17', t: 'Napangiti ako.<br>Doon ko naunawaan.' },
        { f: 'f18', oy: 70, t: 'Magkaiba man ang pamilya namin, pareho naman kaming minamahal.' },
        { f: 'f19', t: '<strong>Hindi kailangang magkapareho ang mga pamilya, basta’t puno ng pagmamahal.</strong>', spot: [416, 0, 365, 478, 'Si Biboy na nag-iisip'], tanong: 'Ano ang natutunan ni Biboy<br>tungkol sa pamilya?' },
        { f: 'subukan', pic: 'f19', t: '<strong>Hindi kailangang magkapareho ang mga pamilya, basta’t puno ng pagmamahal.</strong>', subukan: 'Ang galing ninyo sa pagbasa! Pero hindi pa tayo tapos! Subukan natin kung gaano ninyo naunawaan ang kuwento.' },
      ],
      hamon: 'Oras na para subukan ang iyong pagkaunawa sa kuwento! Balikan ang mga pangyayari at gamitin ang iyong natutuhan upang masagutan ang mga gawain.',
      gawain: [
        { slug: 'tuklasin', name: 'TUKLASIN', head: 'MAY GABAY NG GURO', text: 'Ang mga katanungan sa gawain na ito ay mayroong katumbas na mga pagpipiliang sagot at pahiwatig.' },
        { slug: 'suriin', name: 'SURIIN', head: 'SARILING PAG-IISIP', text: 'Ang mga katanungan sa gawaing ito ay sasagutin sa pamamagitan ng direktang pagsagot sa guro.' },
        { slug: 'paglalagom', name: 'PAGLALAGOM', head: 'SARILING PAG-UNAWA', text: 'Ilahad muli ang mga bahagi ng kuwento mula simula hanggang wakas base sa sariling pag-unawa.' },
      ],
    },
  };
  const pkUrl = (id, screen) => `#/lakbay-aralin/kuwento/${id}/pagkatapos-basahin${screen ? `/${screen}` : ''}`;
  const abUrl = (id, screen) => `#/lakbay-aralin/kuwento/${id}/ang-babasahin${screen ? `/${screen}` : ''}`;
  const AB_BOX = 0.625; // the box starts here, as a share of the window; see .st-box
  const AB_MID = 0.82; // the middle of the box below its rim
  const abState = { esc: null, oy: 0, white: 900, sub: false };
  const abTabs = (a, b) => `<i class="st-tab" style="left:${a[0]}px;top:${a[1]}px;width:${a[2]}px;height:${a[3]}px"></i><i class="st-tab" style="left:${b[0]}px;top:${b[1]}px;width:${b[2]}px;height:${b[3]}px"></i>`;

  function abPage(id, p, tanong) {
    const pic = tanong ? `p${p.f.slice(1)}` : (p.pic || p.f);
    $('st-art').innerHTML = `<img src="${AB_ART}${pic}.jpg" alt="">${!tanong && p.spot ? `<a class="st-spot" id="st-spot" href="${abUrl(id, `${p.f}-tanong`)}" aria-label="${p.spot[4]}: buksan ang tanong" style="--x:${p.spot[0]};--y:${p.spot[1]};--w:${p.spot[2]};--h:${p.spot[3]}"></a>` : ''}`;
    if (p.subukan) {
      return `<p class="st-text st-ghost" aria-hidden="true">${p.t}</p><i class="st-veil"></i>
        <img class="st-biboy" src="${AB_ART}biboy-subukan.png" alt="">${bbBubble(p.subukan, 'st-bubble-clip')}
        <div class="bb-handa-sign">${bbSign(409, 64, 702, 80, 'navy', 'SUBUKAN NATIN!', 47).replaceAll('bb-sign-navy', 'st-sign').replace('bb-card-title', 'st-focus')}</div>`;
    }
    if (tanong) {
      return `<div class="st-band">${abTabs([28.6, 565, 126, 99], [126, 565.7, 69, 102.5])}</div>
        <h1 class="st-q" id="st-focus" tabindex="-1">${p.tanong}</h1>`;
    }
    if (p.f === 'f0') {
      return `<div class="st-cover">${abTabs([31.7, 64, 115.5, 91.8], [121.5, 65.7, 62.4, 95.4])}
        <div class="st-plate"><h1 id="st-focus" tabindex="-1">${AB_STORY[id].pamagat}</h1></div>
        <div class="st-tag"><img class="st-tag-bg" src="${AB_ART}tab.svg" alt=""><img class="st-tag-dash" src="${AB_ART}tab-dash.png" alt=""><span>KUWENTO #1</span></div>
        <div class="st-go">${pill({ tone: 'green', label: 'Simulan', name: 'Simulan ang kuwento', href: abUrl(id, 'f1') })}</div></div>`;
    }
    return `<p class="st-text" id="st-focus" tabindex="-1">${p.t}</p>`;
  }

  function abShow(id, screen) {
    const s = AB_STORY[id];
    const name = screen && screen.replace(/-tanong$/, '');
    const at = s.pahina.findIndex((p) => p.f === name);
    const page = s.pahina[at];
    const tanong = !!page && screen.endsWith('-tanong') && !!page.tanong;
    showView('view-lakbay');
    document.title = `Ang Basahin — ${LESSONS[id].title} — Kuwenturo`;
    bbState.story = id;
    abState.esc = tanong ? abUrl(id, name) : bbSteps(id);
    if (!page) {
      tallFill({ tone: 'ang', no: '2', board: 'ANG<br>BASAHIN', title: 'Ang Basahin', head1: 'PAALALA', text1: s.paalala, head2: 'TANDAAN',
        lead: s.lead, items: s.tandaan, back: bbSteps(id), next: abUrl(id, 'f0') });
      const changedT = lkShow('lk-tall') || bbState.screen !== 'ab-simula';
      bbState.screen = 'ab-simula';
      $('lk-tall').scrollTop = 0;
      if (changedT) $('bb-tall-title').focus({ preventScroll: true });
      return;
    }
    const after = s.pahina[at + 1];
    $('st-prev').href = tanong ? abUrl(id, name) : (at ? abUrl(id, s.pahina[at - 1].f) : abUrl(id));
    $('st-next').href = after ? abUrl(id, after.f) : pkUrl(id);
    $('st-next').setAttribute('aria-label', after ? 'Susunod' : 'Susunod: Pagkatapos Basahin');
    $('st-stage').innerHTML = abPage(id, page, tanong);
    $('st-stage').dataset.page = screen;
    $('lk-story').classList.toggle('is-q', tanong);
    $('lk-story').classList.toggle('is-whole', tanong || name === 'f0');
    $('lk-story').classList.toggle('is-sub', !!page.subukan);
    abState.sub = !!page.subukan;
    abState.oy = tanong ? 0 : (page.oy || 0);
    abState.white = tanong ? 900 : (page.w || 900);
    if (after) new Image().src = `${AB_ART}${after.pic || after.f}.jpg`; // the next page is usually a tap away
    bbState.screen = screen;
    lkShow('lk-story');
    $('lk-story').scrollTop = 0;
    $('st-focus').focus({ preventScroll: true });
  }

  function lkBago(id, screen) {
    const known = BB_ORDER.includes(screen) || BB_STORY[id].salita.some((w) => `salita-${w.slug}` === screen);
    const name = known ? screen : 'simula';
    showView('view-lakbay');
    document.title = `Bago Basahin — ${LESSONS[id].title} — Kuwenturo`;
    if (name === 'simula') {
      bbRenderTall(id);
      const changed = lkShow('lk-tall');
      bbState.screen = name;
      $('lk-tall').scrollTop = 0;
      if (changed) $('bb-tall-title').focus({ preventScroll: true });
      return;
    }
    if (name !== 'hulaan') bbState.picked = null;
    const prev = bbState.screen;
    const sc = bbScene(id, name);
    const popup = bbModal(id, name);
    LK_DESIGN['lk-bb'].bg = sc.bg[1];
    const bg = $('lk-bb').querySelector('.lk-bg');
    const file = BB_ART + sc.bg[0];
    if (!bg.src.endsWith(file)) bg.src = file;
    $('bb-stage').innerHTML = sc.html;
    $('bb-stage').inert = !!popup;
    $('bb-veil').hidden = !popup;
    $('bb-modal').hidden = !popup;
    $('bb-modal').innerHTML = popup;
    $('bb-modal').setAttribute('aria-labelledby', popup ? 'bb-card-title' : 'bb-title');
    bbNav(id, name);
    bbState.story = id;
    bbState.screen = name;
    lkShow('lk-bb');
    lkFit();
    if (prev !== name) {
      const title = $(popup ? 'bb-card-title' : 'bb-title');
      if (title) title.focus({ preventScroll: true });
      else if ($('bb-card-title')) $('bb-card-title').focus({ preventScroll: true });
    }
  }

  $('bb-modal').addEventListener('click', (event) => {
    const btn = event.target.closest('.bb-opt');
    if (!btn || bbState.picked !== null) return;
    bbState.picked = Number(btn.dataset.opt);
    const opt = BB_STORY[bbState.story].hulaan.pagpipilian[bbState.picked];
    $('bb-modal').innerHTML = bbModal(bbState.story, 'hulaan');
    const again = $('bb-modal').querySelector(`[data-opt="${bbState.picked}"]`);
    if (again) again.focus({ preventScroll: true });
    announce(opt.tama ? 'Magaling! Tama ang iyong sagot.' : 'Subukan muli sa susunod. Mali ang iyong sagot.');
  });

  // ---------- Lakbay: Pagkatapos Basahin (LAKBAY-INTERFACE 9:64624) ----------
  function pkShow(id, screen) {
    const s = AB_STORY[id];
    if (screen && screen.startsWith('tuklasin')) { tkShow(id, screen); return; }
    const act = s.gawain.find((g) => g.slug === screen);
    if (act) {
      lkHide();
      showPage({
        kicker: `Pagkatapos Basahin · ${LESSONS[id].title}`,
        title: act.name[0] + act.name.slice(1).toLowerCase(),
        body: `<p>Malapit na ang gawaing ito.</p>
          <div class="lk-page-back">${pill({ tone: 'blue', label: 'Bumalik sa Gawain', name: 'Bumalik sa Gawain', href: pkUrl(id) })}</div>`,
      });
      return;
    }
    showView('view-lakbay');
    document.title = `Pagkatapos Basahin — ${LESSONS[id].title} — Kuwenturo`;
    bbState.story = id;
    abState.esc = bbSteps(id);
    const gawain = s.gawain.map((g, i) => `<a class="pk-card" href="${pkUrl(id, g.slug)}" style="top:${196 + 282 * i}px" aria-label="${g.name}: ${g.head}. ${g.text}">
      <i class="pk-bar"></i>
      <span class="pk-thumb"><img src="${AB_ART}gawain-${g.slug}.jpg" alt=""><b>${g.name}</b></span>
      <span class="pk-t"><b>${g.head}</b><span>${g.text}</span></span></a>`).join('');
    tallFill({ tone: 'pk', no: '3', board: 'PAGKATAPOS<br>BASAHIN', title: 'Pagkatapos Basahin', note: 'Sagutan ang mga gawain at magbuod', head1: 'HAMON', text1: s.hamon, head2: 'GAWAIN',
      lead: 'Pumili ng gawain:', gawain, back: abUrl(id, 'subukan'), next: bbSteps(id) });
    const changed = lkShow('lk-tall') || bbState.screen !== 'pk-simula';
    bbState.screen = 'pk-simula';
    $('lk-tall').scrollTop = 0;
    if (changed) $('bb-tall-title').focus({ preventScroll: true });
  }

  // ---------- Lakbay: Tuklasin, Ang Nawawalang Larawan (LAKBAY-INTERFACE 1049:3008, 1049:4657) ----------
  const TK_ART = 'assets/lakbay/tuklasin/';
  const TK_ROOM_TOP = 40; // on wide windows the room starts this far down its picture, keeping the pieces clear of the buttons
  // left, top, width, height in the frame; the last value turns the piece as the frame does
  const TK_PIECES = [
    ['piece-f', 1026, 116, 101.7, 85.5, ''],
    ['piece-e', 74, 113, 102.8, 113.4, ''],
    ['piece-e', 818.2, 147, 102.8, 113.4, 'rotate(180deg)'],
    ['piece-c', 69, 344, 115.8, 122.3, ''],
    ['piece-b', 283, 148, 82.8, 92, ''],
    ['piece-d', 818, 267, 116.7, 85.8, ''],
    ['piece-a', 1023, 344, 82.9, 105, ''],
    ['piece-a', 238, 280, 82.9, 105, 'scaleY(-1)'],
  ];
  const TK_DALOY = [
    'May mga piraso<br>ng <em>puzzle</em> na<br>nakapalibot.',
    'Mayroong mga piraso na tama, at mayroon ding mali.',
    'Kada pili ng piraso, lalabas ang katumbas na detalye ng kuwento.',
    'Kapag tama ang detalye na ito. pinudutin ang &ldquo;Opo!&rdquo;',
    'Kapag hindi ito detalye ng kuwento, pindutin naman ang &ldquo;Hindi po&rdquo;',
    'Sa bawat tamang sagot ng mga mag-aaral, mapupunta ang piraso sa frame.',
    'Mabubuo lamang ang larawan kapag tama ang mga napiling piraso.',
    'Pindutin ang nasa itaas para sa makita ang tamang sagot at mga kagamitan.',
  ];
  const TK_KEYS = [
    ['gl1', 'sort', 72.44, 67.61, 183.9, 206.2, 'Pindutin upang makita ang daloy ng gawain'],
    ['gl2', 'star', 57.34, 51.36, 217.3, 217.3, 'Pindutin upang makita ang tamang sagot at paliwanag nito'],
    ['gl3', 'alarm', 74.04, 62.51, 183.9, 217.3, 'Pindutin upang makita ang mga kagamitan'],
  ];
  const TK_SOON = { sagot: 'Mga Tamang Sagot', laro: 'Ang Nawawalang Larawan' };
  const TK_TOOLS = ['kagamitan', 'piliin', 'gulong', 'napili', 'patahimikin', 'shh'];
  const TK_NAMES_KEY = 'kuwenturo.pangalan';
  const TK_NAMES_MAX = 60;
  const TK_SPIN_MS = 5000;
  const tkState = { room: false, from: null, turn: 0, spin: 0, name: '' };
  const tkNames = (text) => text.split(/[\n,]/).map((n) => n.trim()).filter(Boolean).slice(0, TK_NAMES_MAX);
  const tkSaved = () => storage.get(TK_NAMES_KEY) || '';
  // The slices, drawn on a 1000-unit wheel. Slice 0 starts centred at the top, as in the frame; with no names yet the wheel keeps the frame's 24 spokes
  function tkSlices(names) {
    const n = names.length || 24;
    const step = 360 / n;
    const spoke = (i) => `<line x1="500" y1="500" x2="500" y2="36" transform="rotate(${(i + 0.5) * step} 500 500)"/>`;
    // One size for every name: the longest sets it, and only a very long name is cut short here (the result shows it whole)
    const room = 230;
    const base = n <= 8 ? 42 : n <= 16 ? 34 : n <= 28 ? 26 : n <= 40 ? 20 : 16;
    const size = Math.max(Math.min(base, 18), Math.min(base, room / (Math.max(1, ...names.map((name) => name.length)) * 0.56)));
    const fits = Math.floor(room / (size * 0.56) + 0.01);
    const words = names.map((name, i) => {
      const shown = name.length > fits ? `${name.slice(0, fits - 1)}${String.fromCharCode(8230)}` : name;
      return `<text x="790" y="500" font-size="${size.toFixed(1)}" transform="rotate(${i * step - 90} 500 500)">${escapeHtml(shown)}</text>`;
    }).join('');
    return `<g class="tk-spokes">${Array.from({ length: n }, (_, i) => spoke(i)).join('')}</g><g class="tk-words">${words}</g>`;
  }
  const tkWheelArt = (names) => `<svg viewBox="0 0 1000 1000" aria-hidden="true"><defs>
      <linearGradient id="tk-ring" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#001343"/><stop offset=".5" stop-color="#002581"/><stop offset="1" stop-color="#001343"/></linearGradient>
      <linearGradient id="tk-disc"><stop stop-color="#FFF4C0"/><stop offset=".5" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFF4C0"/></linearGradient></defs>
      <circle cx="500" cy="500" r="500" fill="url(#tk-ring)"/>
      <g id="tk-spin" style="transform:rotate(${tkState.turn}deg)"><circle cx="500" cy="500" r="464" fill="url(#tk-disc)"/>${tkSlices(names)}</g></svg>
    <img class="tk-hub" src="${TK_ART}qt-head.png" alt="">`;
  const tkPin = (text = 'PINIPILI KO') => `<svg class="tk-pin" viewBox="0 0 303 69" aria-hidden="true"><defs><linearGradient id="tk-pin"><stop stop-color="#AF0414"/><stop offset=".5" stop-color="#E43D45"/><stop offset="1" stop-color="#AF0414"/></linearGradient></defs>
      <path d="M0 0H303V46L151.5 67L0 46Z" fill="url(#tk-pin)"/><path d="M1.2 1.2H301.8V45L151.5 65.6L1.2 45Z" fill="none" stroke="#FFFBF4" stroke-width="1.6" stroke-dasharray="9"/>
      <text x="151.5" y="39" text-anchor="middle" font-size="40.6">${text}</text></svg>`;
  // The ring, the disc and the banner of Patahimikin Na; the art inside is one picture, drawn smaller once the message shows
  const tkShh = (box) => `<div class="tk-disc"><i class="tk-ring"></i><i class="tk-face"></i><img class="tk-shh-art" src="${TK_ART}pt-art.png" alt="" style="${box}">${tkPin('SHHHHHHH')}</div>`;
  const tkUrl = (id, screen) => pkUrl(id, screen ? `tuklasin-${screen}` : 'tuklasin');
  const tkRename = (sign) => sign.replaceAll('bb-sign-navy', 'tk-sign').replace('bb-card-title', 'tk-title');
  const tkSign = (text, y, fs = 49.5) => tkRename(bbSign(224, y, 733.3, 92.7, 'navy', text, fs));
  const tkTabs = (y) => {
    const bg = `background:linear-gradient(0deg, ${BB_TONES.navy.sign.join(',')})`;
    return `<i class="lk-tab bb-tab" style="left:31.7px;top:${y + 10}px;width:115.5px;height:91.8px;${bg}"></i><i class="lk-tab bb-tab" style="left:121.5px;top:${y + 5}px;width:62.4px;height:95.4px;${bg}"></i>`;
  };
  // A cream card with its dashes, its folder tabs and the banner across its top
  const tkCard = (y, h, inset, sign) => tkTabs(y) + bbPanel(24, y + 46, 1133.5, h, 45.7, y + 46 + inset, 1089, h - inset * 2, '#001343').replace('rx="30"', 'rx="16"') + sign;
  const tkScreens = {
    start: () => `<img class="tk-cork" src="${TK_ART}cork.png" alt="Bakanteng frame na may hugis ng anim na piraso ng puzzle">${tkCard(443, 261, 23, tkSign('TUKLASIN #1', 452))}
      <p class="tk-box tk-name">ANG NAWAWALANG<br>LARAWAN</p>`,
    pindutin: () => `${tkCard(176, 475, 22, tkSign('PINDUTIN', 185))}
      <ul class="tk-keys">${TK_KEYS.map(([gl, icon, x, y, w, h, text], i) => `<li style="left:${[83, 421, 763][i]}px">
        <span class="tk-ico"><span class="tk-gl tk-${gl}"><img src="${TK_ART}${gl}.svg" alt=""></span><img class="tk-sym" src="${TK_ART}${icon}.svg" alt="" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"></span>
        <p>${text}</p></li>`).join('')}</ul>`,
    biboy: (id) => `<div class="tk-1200">${bbBubble('Nawawala po ang larawan ng pamilya ni Popoy! Maaari niyo po ba ako tulungan na buuin ito?', 'tk-bubble-clip')}
      <div class="bb-handa-sign">${tkRename(bbSign(409, 64, 702, 80, 'navy', 'TUKLASIN NATIN!', 47))}</div>
      <img class="bb-art bb-keep" src="${TK_ART}biboy-kaway.png" style="left:24.4px;top:181.7px;width:524.3px;height:865.4px" alt="">
      <div class="tk-opts"><a class="tk-opt tk-opo" id="tk-opo" href="${tkUrl(id, 'panuto')}"><img src="${TK_ART}opo.png" alt="Opo!"></a><a class="tk-opt tk-hindi" id="tk-hindi" href="${pkUrl(id)}"><img src="${TK_ART}hindi.png" alt="Hindi Po"></a></div></div>`,
    panuto: () => `<div class="tk-pieces"><img src="${TK_ART}pieces.png" alt="Anim na bakanteng puwang sa frame at mga piraso ng puzzle sa paligid nito"><img class="tk-glow" src="${TK_ART}piece-a.png" alt=""></div>${tkCard(461, 261, 23.3, tkSign('PANUTO', 470))}
      <p class="tk-box tk-panuto">Tulungan si Biboy buuin ang larawan ng pamilya ni Popoy. Piliin ang mga piraso ng <em>puzzle</em> na may tamang detalye mula sa kuwento. Tukuyin kung ang detalye ay angkop sa tauhan, tagpuan, pangyayari, at aral.</p>`,
    daloy: () => `${tkCard(114, 610, 32, tkSign('DALOY NG GAWAIN', 126, 47))}
      <img class="tk-line" src="${TK_ART}line.svg" alt="" style="top:262px"><img class="tk-line" src="${TK_ART}line.svg" alt="" style="top:489px">
      <ol class="tk-daloy">${TK_DALOY.map((text, i) => `<li><b>${i + 1}</b><span>${text}</span></li>`).join('')}</ol>`,
    kagamitan: (id) => `<div class="tk-q"><h1 class="tk-vh" id="tk-title" tabindex="-1">Kagamitan</h1><img class="tk-qcard" src="${TK_ART}qt-card.png" alt="">
      <a class="tk-tool" id="tk-pili" href="${tkUrl(id, 'piliin')}" aria-label="Pilian Na" style="left:115.6px;top:258px;width:480.2px;height:450px"><img src="${TK_ART}qt-pili.png" alt=""></a>
      <a class="tk-tool" id="tk-tahimik" href="${tkUrl(id, 'patahimikin')}" aria-label="Patahimikin Na" style="left:607.2px;top:257px;width:480.2px;height:450px"><img src="${TK_ART}qt-tahimik.png" alt=""></a>
      <a class="tk-tool" id="tk-isara" href="${tkUrl(id, tkState.from || 'simula')}" aria-label="Isara ang Kagamitan" style="left:1016.5px;top:173px;width:89px;height:65px"><img src="${TK_ART}qt-isara.png" alt=""></a></div>`,
    piliin: (id) => `<a class="tk-tool tk-x" id="tk-x" href="${tkUrl(id, 'kagamitan')}" aria-label="Isara"><img src="${TK_ART}qt-x.png" alt=""></a>
      <button class="tk-wheel" id="tk-wheel" type="button" aria-label="Buksan ang gulong" style="left:367.5px;top:28.5px;width:447px;height:447px">${tkWheelArt(tkNames(tkSaved()))}${tkPin()}</button>
      <i class="tk-navy"></i>${tkTabs(471)}${bbPanel(27.2, 525.6, 1129.9, 260.2, 48.8, 548.9, 1085.7, 215.9, '#001343').replace('rx="30"', 'rx="16"')}
      ${tkRename(bbSign(226.6, 491.3, 731, 92.4, 'navy', 'MGA PANGALAN', 47))}
      <label class="tk-vh" for="tk-names">Mga pangalan ng mag-aaral. Isang pangalan sa bawat linya.</label>
      <textarea class="tk-names" id="tk-names" placeholder="Isulat dito ang mga pangalan, isa sa bawat linya" spellcheck="false">${escapeHtml(tkSaved())}</textarea>`,
    gulong: (id) => `<a class="tk-tool tk-x" id="tk-x" href="${tkUrl(id, 'piliin')}" aria-label="Isara"><img src="${TK_ART}qt-x.png" alt=""></a>
      <h1 class="tk-vh" id="tk-title" tabindex="-1">Pinipili Ko</h1>
      <button class="tk-wheel" id="tk-wheel" type="button" aria-label="Paikutin ang gulong" style="left:194px;top:49px;width:792px;height:792px">${tkWheelArt(tkNames(tkSaved()))}${tkPin()}</button>
      <p class="tk-note" id="tk-note" role="status" hidden>Magsulat muna ng mga pangalan sa kahon ng Mga Pangalan.</p>`,
    napili: (id) => `<div class="tk-q"><a class="tk-tool tk-x" id="tk-x" href="${tkUrl(id, 'gulong')}" aria-label="Isara"><img src="${TK_ART}qt-x.png" alt=""></a>
      <a class="tk-chosen" href="${tkUrl(id, 'gulong')}" aria-label="Paikutin muli ang gulong"><i class="tk-ring"></i><i class="tk-face"></i><img class="tk-bighead" src="${TK_ART}qt-head.png" alt="">${tkPin()}<img class="tk-plate" src="${TK_ART}qt-plate.svg" alt=""></a>
      <h1 class="tk-name2" id="tk-title" tabindex="-1">${escapeHtml(tkState.name.toUpperCase())}</h1></div>`,
    patahimikin: (id) => `<div class="tk-q"><h1 class="tk-vh" id="tk-title" tabindex="-1">Patahimikin Na</h1>
      <a class="tk-tool tk-x" id="tk-x" href="${tkUrl(id, 'kagamitan')}" aria-label="Isara"><img src="${TK_ART}qt-x.png" alt=""></a>
      <a class="tk-shh-go" id="tk-shh" href="${tkUrl(id, 'shh')}" aria-label="Ipakita ang paalala na tumahimik"></a>
      ${tkShh('left:293.1px;top:132.7px;width:591.7px;height:598.2px')}</div>`,
    shh: (id) => `<div class="tk-q"><a class="tk-tool tk-x" id="tk-x" href="${tkUrl(id, 'patahimikin')}" aria-label="Isara"><img src="${TK_ART}qt-x.png" alt=""></a>
      ${tkShh('left:377.5px;top:134px;width:426px;height:431px')}
      <img class="tk-shh-plate" src="${TK_ART}pt-plate.svg" alt="">
      <h1 class="tk-shh-text" id="tk-title" tabindex="-1">IGALANG PO NATIN ANG GURO SA HARAP</h1></div>`,
    simula: () => `<h1 class="tk-vh" id="tk-title" tabindex="-1">Ang Nawawalang Larawan</h1><img class="tk-room" src="${TK_ART}room.jpg" alt="">
      ${TK_PIECES.map(([file, x, y, w, h, turn], i) => `<button class="tk-piece" type="button" aria-label="Piraso ${i + 1} ng puzzle" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><img src="${TK_ART}${file}.png" alt="" style="transform:${turn || 'none'}"></button>`).join('')}
      <img class="tk-kid" src="${TK_ART}biboy-tayo.png" alt="Si Biboy">`,
  };
  const TK_FLOW = {
    start: { bg: 'bg-1', title: 'Tuklasin #1', back: (id) => pkUrl(id), next: 'pindutin' },
    pindutin: { bg: 'bg-2', title: 'Pindutin', back: (id) => tkUrl(id), next: 'biboy', top: true },
    biboy: { bg: 'bg-3', title: 'Tuklasin Natin', back: (id) => tkUrl(id, 'pindutin'), next: 'panuto', bare: true },
    panuto: { bg: 'bg-1', title: 'Panuto', back: (id) => tkUrl(id, 'biboy'), next: 'daloy' },
    daloy: { bg: 'bg-2', title: 'Daloy ng Gawain', back: (id) => tkUrl(id, tkState.from || 'panuto'), next: 'simula' },
    simula: { title: 'Ang Nawawalang Larawan', back: (id) => tkUrl(id, 'daloy'), next: 'laro', top: true, room: true },
    kagamitan: { bg: 'bg-1', title: 'Kagamitan', back: (id) => tkUrl(id, tkState.from || 'simula'), next: 'piliin', bare: true },
    piliin: { bg: 'bg-1', title: 'Piliin Na', back: (id) => tkUrl(id, 'kagamitan'), next: 'gulong', bare: true },
    gulong: { bg: 'bg-1', title: 'Pinipili Ko', back: (id) => tkUrl(id, 'piliin'), next: 'gulong', bare: true },
    napili: { bg: 'bg-1', title: 'Pinipili Ko', back: (id) => tkUrl(id, 'gulong'), next: 'gulong', bare: true },
    patahimikin: { bg: 'bg-1', title: 'Patahimikin Na', back: (id) => tkUrl(id, 'kagamitan'), next: 'shh', bare: true },
    shh: { bg: 'bg-1', title: 'Patahimikin Na', back: (id) => tkUrl(id, 'patahimikin'), next: 'patahimikin', bare: true },
  };

  function tkShow(id, screen) {
    const name = screen.replace(/^tuklasin-?/, '') || 'start';
    clearTimeout(tkState.spin);
    tkState.spin = 0;
    if (name === 'napili' && !tkState.name) { location.replace(tkUrl(id, 'gulong')); return; }
    if (TK_SOON[name]) {
      lkHide();
      showPage({
        kicker: `Tuklasin ${String.fromCharCode(183)} ${LESSONS[id].title}`,
        title: TK_SOON[name],
        body: `<p>Malapit na ang bahaging ito ng gawain.</p>
          <div class="lk-page-back">${pill({ tone: 'blue', label: 'Bumalik sa Gawain', name: 'Bumalik sa Gawain', href: tkUrl(id, tkState.from || 'simula') })}</div>`,
      });
      return;
    }
    const key = tkScreens[name] ? name : 'start';
    const step = TK_FLOW[key];
    if (key !== 'daloy' && !TK_TOOLS.includes(key)) tkState.from = null;
    showView('view-lakbay');
    document.title = `${step.title} ${String.fromCharCode(8212)} ${LESSONS[id].title} ${String.fromCharCode(8212)} Kuwenturo`;
    bbState.story = id;
    tkState.room = !!step.room;
    $('tk-stage').innerHTML = tkScreens[key](id);
    $('lk-tk').className = `lk-scene lk-full lk-tk is-${key}`;
    $('tk-bg').hidden = !step.bg;
    if (step.bg) $('tk-bg').src = `${TK_ART}${step.bg}.jpg`;
    $('tk-top').hidden = !step.top;
    $('tk-daloy').href = tkUrl(id, 'daloy');
    $('tk-sagot').href = tkUrl(id, 'sagot');
    $('tk-gamit').href = tkUrl(id, 'kagamitan');
    $('tk-nav').hidden = !!step.bare; // Biboy asks instead: the frame has Opo and Hindi Po, no arrows
    $('tk-prev').href = step.back(id);
    $('tk-next').href = tkUrl(id, step.next);
    lkShow('lk-tk');
    lkFit();
    $('lk-tk').scrollTop = 0;
    const title = $('tk-title');
    title.focus({ preventScroll: true });
    if (key === 'napili') tkFitName();
  }
  // Long names shrink until they sit inside the plate
  function tkFitName() {
    const el = $('tk-title');
    let size = 90;
    el.style.fontSize = `${size}px`;
    while (el.scrollWidth > el.clientWidth && size > 28) { size -= 2; el.style.fontSize = `${size}px`; }
  }
  // The name is read from the wheel itself: whichever slice stopped under the point is the one chosen
  function tkSpin() {
    if (tkState.spin) return;
    const names = tkNames(tkSaved());
    if (!names.length) { $('tk-note').hidden = false; return; }
    const random = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
    const step = 360 / names.length;
    const aim = Math.floor(random() * names.length) * step + (random() - 0.5) * step * 0.7;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const turn = tkState.turn + (still ? 0 : 2160) + ((((-aim - tkState.turn) % 360) + 360) % 360);
    tkState.turn = turn;
    $('tk-spin').style.transition = still ? 'none' : `transform ${TK_SPIN_MS}ms cubic-bezier(.12, .7, .1, 1)`;
    $('tk-spin').style.transform = `rotate(${turn}deg)`;
    $('tk-wheel').classList.add('is-spin');
    tkState.spin = setTimeout(() => {
      const top = ((-turn % 360) + 360) % 360;
      tkState.name = names[Math.round(top / step) % names.length];
      announce(`Napili si ${tkState.name}.`);
      tkState.spin = setTimeout(() => { location.hash = tkUrl(bbState.story, 'napili'); }, 700);
    }, still ? 300 : TK_SPIN_MS + 80);
  }
  $('lk-tk').addEventListener('click', (event) => {
    if (!event.target.closest('#tk-wheel')) return;
    if (location.hash.endsWith('tuklasin-piliin')) location.hash = tkUrl(bbState.story, 'gulong');
    else tkSpin();
  });
  $('lk-tk').addEventListener('input', (event) => {
    if (event.target.id !== 'tk-names') return;
    storage.set(TK_NAMES_KEY, event.target.value);
    const turned = $('tk-spin');
    turned.querySelectorAll('.tk-spokes, .tk-words').forEach((g) => g.remove());
    turned.insertAdjacentHTML('beforeend', tkSlices(tkNames(event.target.value)));
  });
  $('tk-top').addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    const m = location.hash.match(/tuklasin-(\w+)$/);
    tkState.from = m ? m[1] : null;
  });

  function bbEscape() {
    if (lkScene === 'lk-tk') {
      const x = $('tk-x') || $('tk-isara');
      location.hash = x ? x.getAttribute('href') : pkUrl(bbState.story);
      return;
    }
    if (lkScene === 'lk-story' || $('lk-tall').matches('.is-ang, .is-pk')) { location.hash = abState.esc; return; }
    const close = $('bb-modal').hidden ? null : $('bb-modal').querySelector('.bb-close');
    location.hash = close ? close.getAttribute('href') : bbSteps(bbState.story || Object.keys(BB_STORY)[0]);
  }

  function lkModal(open) {
    $('lk-veil').hidden = !open;
    $('lk-modal').hidden = !open;
    document.querySelector('#lk-street > .lk-stage').inert = open;
    lkFit();
  }
  function lkRenderCard(id) {
    const l = LESSONS[id];
    const c = LK_DETAIL[id];
    const n = LK_STORY_ORDER.indexOf(id) + 1;
    const from = LK_STREETS.find((s) => s.street === l.street);
    $('lk-modal-no').textContent = `KUWENTO #${n}`;
    $('lk-m-art').src = c.art;
    $('lk-m-street').textContent = l.street.toUpperCase();
    $('lk-m-title').textContent = l.title;
    $('lk-m-time').textContent = `${l.minutes}min`;
    $('lk-m-aralin').textContent = LK_ARALIN[n - 1];
    $('lk-m-salita').textContent = c.salita;
    $('lk-m-aral').textContent = c.aral;
    $('lk-m-paksa').textContent = c.paksa;
    $('lk-m-close').href = `#/lakbay-aralin/${from.slug}`;
    $('lk-m-go').innerHTML = pill({ tone: 'green', label: 'Simulan', name: `Simulan ang ${l.title}`, href: `#/lakbay-aralin/kuwento/${id}/hakbang` });
    return from;
  }
  function lkRenderSteps(id) {
    const l = LESSONS[id];
    $('lk-steps-title').textContent = l.title.toUpperCase();
    $('lk-steps-close').href = `#/lakbay-aralin/kuwento/${id}`;
    $('lk-step-signs').innerHTML = LK_STEPS.map((s, i) => `
      <a class="lk-step lk-step-${s.tone}" href="#/lakbay-aralin/kuwento/${id}/${s.slug}" aria-label="Hakbang ${i + 1}: ${s.title}. ${s.note}">
        <i class="lk-step-pole"></i>
        <span class="lk-step-board"><span>${s.lines.join('<br>')}</span></span>
        <b class="lk-step-no">${i + 1}</b>
        <span class="lk-step-note"><span>${s.note}</span></span>
      </a>`).join('');
  }

  function lkRoute(id, sub, step, screen) {
    const street = LK_STREETS.find((s) => s.slug === id);
    if (id === 'kuwento' && BB_STORY[sub] && step === 'bago-basahin') {
      lkModal(false);
      lkBago(sub, screen);
      return;
    }
    if (id === 'kuwento' && AB_STORY[sub] && step === 'ang-babasahin') {
      lkModal(false);
      abShow(sub, screen);
      return;
    }
    if (id === 'kuwento' && AB_STORY[sub] && step === 'pagkatapos-basahin') {
      lkModal(false);
      pkShow(sub, screen);
      return;
    }
    if (id === 'kuwento' && LK_DETAIL[sub] && step === 'hakbang') {
      lkModal(false);
      showView('view-lakbay');
      lkRenderSteps(sub);
      const changed = lkShow('lk-steps');
      document.title = `${LESSONS[sub].title} — Kuwenturo`;
      if (changed) $('lk-steps-title').focus({ preventScroll: true });
      return;
    }
    const stepInfo = LK_STEPS.find((s) => s.slug === step);
    if (id === 'kuwento' && LK_DETAIL[sub] && stepInfo) {
      lkHide();
      showPage({
        kicker: LESSONS[sub].title,
        title: stepInfo.title,
        body: `<p>Malapit na ang bahaging ito ng lakbay.</p>
          <div class="lk-page-back">${pill({ tone: 'blue', label: 'Bumalik sa mga Hakbang', name: 'Bumalik sa mga Hakbang', href: `#/lakbay-aralin/kuwento/${sub}/hakbang` })}</div>`,
      });
      return;
    }
    if (id === 'kuwento' && LK_DETAIL[sub]) {
      showView('view-lakbay');
      const from = lkRenderCard(sub);
      lkRenderStreet(from);
      lkShow('lk-street');
      const wasOpen = !$('lk-modal').hidden;
      lkModal(true);
      document.title = `${LESSONS[sub].title} — Kuwenturo`;
      if (!wasOpen) $('lk-modal-no').focus({ preventScroll: true });
      return;
    }
    lkModal(false);
    if (id === 'kuwento' && LESSONS[sub]) {
      lkHide();      const l = LESSONS[sub];
      const n = LK_STORY_ORDER.indexOf(sub) + 1;
      const from = LK_STREETS.find((s) => s.street === l.street);
      showPage({
        kicker: `Kuwento #${n} · ${l.street}`,
        title: l.title,
        body: `<p>Malapit na ang kuwentong ito sa Lakbay Aralin.</p>
          <div class="lk-page-back">${pill({ tone: 'blue', label: `Bumalik sa Kuwentong ${from.name}`, name: `Bumalik sa Kuwentong ${from.name}`, href: `#/lakbay-aralin/${from.slug}` })}</div>`,
      });
      return;
    }
    const wasHidden = showView('view-lakbay');
    let changed;
    if (street) {
      lkRenderStreet(street);
      const stale = document.title !== `Kuwentong ${street.name} — Kuwenturo`;
      changed = lkShow('lk-street') || stale;
      document.title = `Kuwentong ${street.name} — Kuwenturo`;
      if (changed || stale) $('lk-street-title').focus({ preventScroll: true });
    } else if (id === 'saan-patungo') {
      changed = lkShow('lk-saan');
      document.title = 'Saan Patungo — Kuwenturo';
      if (changed) $('lk-saan-title').focus({ preventScroll: true });
    } else {
      changed = lkShow('lk-start');
      document.title = 'Lakbay Aralin — Kuwenturo';
      if (changed || wasHidden) $('lk-start-title').focus({ preventScroll: true });
    }
  }

  new ResizeObserver(lkFit).observe($('view-lakbay'));
  lkPhone.addEventListener('change', lkFit);
  document.addEventListener('keydown', (event) => {
    if (!lkScene || lkScene === 'lk-start' || document.querySelector('dialog[open]')) return;
    if (lkScene === 'lk-bb' || lkScene === 'lk-tall' || lkScene === 'lk-story' || lkScene === 'lk-tk') {
      const nav = { 'lk-tall': ['bb-tall-prev', 'bb-tall-next'], 'lk-story': ['st-prev', 'st-next'], 'lk-bb': ['bb-prev', 'bb-next'], 'lk-tk': ['tk-prev', 'tk-next'] }[lkScene];
      if (event.key === 'Escape') { event.preventDefault(); bbEscape(); }
      else if (lkScene === 'lk-tk' && ($('tk-x') || $('tk-isara'))) return; // the wheel screens close with their X, and arrows move the text cursor
      else if (event.key === 'ArrowLeft' && !$(nav[0]).closest('[inert]')) location.hash = $(nav[0]).getAttribute('href');
      else if (event.key === 'ArrowRight' && !$(nav[1]).closest('[inert]')) location.hash = $(nav[1]).getAttribute('href');
      return;
    }
    const modalOpen = !$('lk-modal').hidden;    if (event.key === 'Escape') {
      event.preventDefault();
      location.hash = (modalOpen ? $('lk-m-close') : $(lkScene).querySelector('.lk-stage > .lk-close')).getAttribute('href');
    } else if (lkScene === 'lk-street' && !modalOpen && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      location.hash = $(event.key === 'ArrowLeft' ? 'lk-prev' : 'lk-next').getAttribute('href');
    }
  });

  // ---------- Routing (#/, #/gabay-aralin, #/lakbay-aralin, #/tulong-aralin, #/guro-konek, #/aralin/<id>) ----------
  const VIEWS = ['view-dashboard', 'view-gabay', 'view-lakbay', 'view-tulong', 'view-guro', 'view-tsp', 'view-page'];
  // ---------- Tulong sa Paggamit: Paano Gamitin ----------
  const TSP_CHAPTERS = [
    ['0:00', 'Pagsisimula sa Dashboard'],
    ['1:12', 'Pagpili ng Kuwento sa Gabay Aralin'],
    ['2:40', 'Pag-set up ng Lingguhang Plano'],
  ];
  // Text as in the frames; <b> marks the words the frames set in bold
  const TSP_ITEMS = [
    ['dashboard', 'Dashboard', [
      'Tingnan ang mga araling <b>Natapos</b> at <b>Isinasagawa</b> upang malaman kung alin ang maaari mong ipagpatuloy.',
      'Suriin ang mga nakatakdang aralin at gawain ngayong linggo.',
      'Gamitin ang <b>Search</b>, <b>Notifications</b>, at <b>Profile</b> para maghanap, tumingin ng paalala o mensahe, at ayusin ang account.']],
    ['gabay-aralin', 'Gabay Aralin', [
      'Piliin ang <b>Street</b> batay sa antas ng kuwento, pagkatapos ay pindutin ang <b>Next</b> para pumili ng ibang kuwento na iyong nais makita.',
      'Tignan ang mahahalagang detalye na matutuklasan sa kuwento.',
      'Pindutin ang <b>Bago Basahin</b>, <b>Basahin</b>, o <b>Pagkatapos Basahin</b> para makita ang kaukulang gabay, kuwento, at activity answers.']],
    ['lakbay-aralin', 'Lakbay Aralin', [
      'Piliin ang <b>Street</b> at <b>kuwento</b> na gagamitin para sa reading session ng buong klase.',
      'Sundin ang bawat hakbang mula <b>Bago Basahin</b> hanggang <b>Pagkatapos Basahin</b>.',
      'Gabayan ang bata sa mga activity habang binabasa at inuunawa ang kuwento.',
      'Gamitin ang bawat <b>prompt</b>, <b>activity</b>, at <b>gabay</b> upang maging maayos at tuloy-tuloy ang classroom reading session.']],
    ['tulong-aralin', 'Tulong Aralin', [
      'Pindutin ang <b>Add Story</b> upang pumili ng kuwentong gagamitin sa napiling araw.',
      'I-swipe ang mga kuwento upang makita at piliin ang nais na antas o Street.',
      'Ilagay ang mga napiling kuwento sa bawat araw upang mabuo ang iyong reading plan para sa buong linggo.',
      'I-save ang plano pagkatapos makumpleto ang bawat araw.']],
    ['guro-konek', 'Guro Konek', [
      'Pumunta sa Guro Konek.',
      'Hanapin ang mga obserbasyon mula sa magulang.',
      'Basahin at unawain ang mga mensahe na ipinadala ng mga magulang.',
      'Pindutin ang <b>Tumugon</b> upang makapagpadala ng mensahe pabalik sa mga magulang.']],
  ];
  // Turo Tips (1146:10178; rows open as 1146:10909, 11636, 12365, 13094, 13823, 14552): a sentence, then the bold prompt
  const TSP_TIPS = [
    ['ipakita-ang-pabalat', 'Ipakita ang Pabalat', [
      'Simulan ang pagbabasa sa pamamagitan ng pagtingin sa pabalat at mga larawan.',
      '<b>Ipakita ang pabalat at itanong: “Ano kaya ang kuwento?”</b>']],
    ['huminto-at-magtanong', 'Huminto at Magtanong', [
      'Tulungan ang bata na mag-isip at hulaan ang maaaring mangyari sa kuwento.',
      '<b>Huminto paminsan-minsan at itanong: “Ano kaya ang mangyayari sa susunod?”</b>']],
    ['pag-usapan-ang-mga-larawan', 'Pag-usapan ang mga Larawan', [
      'Gamitin ang mga larawan upang mas madaling maunawaan ng bata ang kuwento.',
      '<b>Ituro ang mga larawan at tanungin: “Ano ang nakikita mo?”</b>']],
    ['iugnay-sa-buhay', 'Iugnay sa Buhay', [
      'Iugnay ang mga pangyayari sa kuwento sa sariling karanasan ng bata.',
      '<b>Itanong: “Naranasan mo na rin ba ang nangyari sa kuwento?”</b>']],
    ['pakinggan-ang-sagot', 'Pakinggan ang Sagot', [
      'Bigyan ang bata ng pagkakataong magpahayag nang malaya, kahit nagkakamali pa.',
      '<b>Hayaan siyang sumagot sa sariling salita at tulungan kapag nahihirapan.</b>']],
    ['balikan-ang-kuwento', 'Balikan ang Kuwento', [
      'Balikan ang mahahalagang pangyayari upang mas mapalalim ang pag-unawa ng bata.',
      '<b>Itanong: “Sino ang paborito mong tauhan? Bakit?”</b>']],
  ];
  // Madalas Itanong (1146:10544; rows open as 1146:11268, 11997, 12726, 13455, 14184, 14913): one answer paragraph each
  const TSP_FAQS = [
    ['may-gabay-na-sagot', 'May mga gabay na sagot ba ang mga gawain?', [
      'Oo! Pumunta sa <b>Gabay Aralin</b> para makita ang overview ng kuwento at mga answer key. Habang nasa activity, maaari ring i-click ang <b>dilaw na button</b> sa itaas ng screen para mabilis na matingnan ang mga answer key.']],
    ['obserbasyon-ng-magulang', 'Saan ko makikita ang mga obserbasyon ng magulang?', [
      'Makikita ang mga ito sa <b>Guro Konek</b>, kung saan maaari ka ring magbigay ng mabilis na kasagutan ukol sa mensahe na ipinadala.']],
    ['bagong-reading-session', 'Paano ako magsisimula ng bagong reading session?', [
      'Maaari mong gamitin ang <b>Gabay Aralin</b> para sa mabilisang pag-check o ang <b>Lakbay Aralin</b> para sa buong classroom reading journey.']],
    ['magkakaibang-antas', 'Paano kung magkakaiba ang antas ng mga mag-aaral?', [
      'Maaari mong basahin nang malakas ang kuwento, gumamit ng mga larawan, magbigay ng pahiwatig, o magtanong ng mas simple o mas malalim ayon sa pangangailangan ng bawat bata.']],
    ['bawat-activity', 'Kailangan bang gawin ang bawat activity?', [
      'Hindi kinakailangan. Maaari mong piliin at iangkop ang mga gawain ayon sa layunin ng aralin, kakayahan ng mga bata, at oras na mayroon ka.']],
    ['walang-grading-system', 'Paano maa-assess ang mga bata kung walang grading system?', [
      'Sa pamamagitan ng sariling obserbasyon ng guro sa pakikilahok at pagsagot ng mga bata. Maaari itong maging dagdag na batayan sa pagbibigay ng grado sa pagtatapos ng grading period, dahil pantulong na materyal lamang ang Kuwenturo.']],
  ];
  // The jeep's signs switch the list under the video; each list keeps its own addresses
  const TSP_PAGES = {
    '': { heading: 'Paano Gamitin?', items: TSP_ITEMS, bullets: true, sign: 'paano' },
    'turo-tips': { heading: 'Turo Tips', items: TSP_TIPS, bullets: false, sign: 'tips', note: true },
    'madalas-itanong': { heading: 'Madalas Itanong (FAQs)', items: TSP_FAQS, bullets: false, sign: 'itanong' },
  };
  const TSP_SOON = {};
  const tspHref = (page, key) => `#/tulong-sa-paggamit${page ? `/${page}` : ''}${key ? `/${key}` : ''}`;
  let tspPage = null;
  let tspChapter = 0;
  let tspPressed = null; // the row just pressed keeps the focus after the list redraws
  function renderTspChapters() {
    $('tsp-chapters').innerHTML = TSP_CHAPTERS.map(([time, name], i) => `<li><button type="button" class="tsp-chapter" data-chapter="${i}" aria-pressed="${i === tspChapter}"><span class="tsp-time">${time}</span> ${name}</button></li>`).join('');
  }
  function renderTsp(page, open) {
    const p = TSP_PAGES[page];
    $('tsp-faq-title').textContent = p.heading;
    $('tsp-note').hidden = !p.note;
    document.querySelectorAll('.tsp-sign').forEach((a) => {
      if (a.classList.contains(`tsp-sign-${p.sign}`)) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('tsp-list').dataset.page = page;
    $('tsp-list').innerHTML = p.items.map(([key, name, lines]) => {
      const on = key === open;
      return `<li class="tsp-item${on ? ' is-open' : ''}">
        <h3 class="tsp-row-wrap"><button type="button" class="tsp-row" data-tsp="${key}" aria-expanded="${on}" aria-controls="tsp-${key}" id="tsp-btn-${key}">
          <span class="tsp-label">${name}</span><img class="tsp-caret" src="assets/tsp-caret.svg" width="24" height="24" alt="">
        </button></h3>
        <div class="tsp-panel" id="tsp-${key}" role="region" aria-labelledby="tsp-btn-${key}"${on ? '' : ' hidden'}>
          ${p.bullets ? `<ul class="tsp-lines">${lines.map((l) => `<li>${l}</li>`).join('')}</ul>` : `<div class="tsp-lines tsp-para">${lines.map((l) => `<p>${l}</p>`).join('')}</div>`}
          <img class="tsp-star tsp-star-l" src="assets/tsp-star.svg" alt=""><img class="tsp-star tsp-star-r" src="assets/tsp-star.svg" alt="">
        </div>
      </li>`;
    }).join('');
  }
  renderTspChapters();
  $('tsp-chapters').addEventListener('click', (event) => {
    const b = event.target.closest('[data-chapter]');
    if (!b) return;
    tspChapter = Number(b.dataset.chapter);
    renderTspChapters();
    $('tsp-chapters').querySelector(`[data-chapter="${tspChapter}"]`).focus();
    announce(`${TSP_CHAPTERS[tspChapter][1]}. Wala pang video na mapapanood.`);
  });
  // Each row opens its own screen (its own address), and pressing it again closes it
  $('tsp-list').addEventListener('click', (event) => {
    const b = event.target.closest('[data-tsp]');
    if (!b) return;
    tspPressed = b.dataset.tsp;
    const open = b.getAttribute('aria-expanded') === 'true';
    const page = $('tsp-list').dataset.page;
    location.hash = tspHref(page, open ? '' : b.dataset.tsp);
  });

  function showView(viewId) {
    const wasHidden = $(viewId).hidden;
    VIEWS.forEach((v) => { $(v).hidden = v !== viewId; });
    return wasHidden;
  }

  function showPage({ kicker, title, body }) {
    showView('view-page');
    $('page-kicker').textContent = kicker;
    $('page-title').textContent = title;
    $('page-body').innerHTML = body;
    document.title = `${title} — Kuwenturo`;
    $('page-title').focus();
  }

  function route() {
    closeDrawer(false); // first, so the new page is no longer inert when its heading takes focus
    const path = location.hash.replace(/^#\/?/, '');
    const [section, id, sub, step, screen] = path.split('/');
    // #/gabay-aralin/<story id>/<part>; the older #/gabay-aralin/<part> uses the current story
    const guidePart = section !== 'gabay-aralin' ? null : (GUIDE_PARTS[id] ? id : (GUIDE_PARTS[sub] ? sub : null));
    const navKey = section === 'aralin' ? 'dashboard' : (SECTIONS[section] ? section : 'dashboard');
    document.querySelectorAll('.nav-link[data-route]').forEach((a) => {
      if (a.dataset.route === navKey) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (!guidePart && guideDialog.open) guideDialog.close();

    let keepScroll = false;
    if (section !== 'lakbay-aralin') lkHide();
    if (section === 'lakbay-aralin') {
      lkRoute(id, sub, step, screen);
    } else if (section === 'gabay-aralin') {
      const wasHidden = showView('view-gabay');
      keepScroll = !wasHidden;
      document.title = 'Gabay Aralin — Kuwenturo';
      if (LESSONS[id]) selectStory(id);
      renderGabay();
      if (wasHidden) $('gabay-title').focus();
      if (guidePart && currentStory()) openGuide(guidePart);
    } else if (section === 'tulong-aralin') {
      const wasHidden = showView('view-tulong');
      keepScroll = !wasHidden;
      document.title = 'Tulong Aralin — Kuwenturo';
      if (wasHidden) tulong.weekStart = weekOf(activeDay());
      tulong.street = Math.max(0, TULONG_STREETS.findIndex((s) => s.slug === id));
      renderDayCards();
      renderStoryCards();
      if (wasHidden) $('tulong-title').focus();
    } else if (section === 'guro-konek') {
      const wasHidden = showView('view-guro');
      document.title = 'Guro Konek — Kuwenturo';
      if (wasHidden) {
        renderObsCards();
        $('guro-title').focus();
      }
    } else if (section === 'tulong-sa-paggamit' && TSP_SOON[id]) {
      showPage({ kicker: 'Tulong sa Paggamit', title: TSP_SOON[id], body: `<p>Malapit na ang bahaging ito.</p><div class="lk-page-back">${pill({ tone: 'blue', label: 'Bumalik', name: 'Bumalik sa Paano Gamitin', href: '#/tulong-sa-paggamit' })}</div>` });
    } else if (section === 'tulong-sa-paggamit') {
      const wasHidden = showView('view-tsp');
      const page = TSP_PAGES[id] && id ? id : '';
      const key = page ? sub : id;
      const item = TSP_PAGES[page].items.find(([k]) => k === key);
      const turned = tspPage !== page; // a jeep sign was pressed: the list under the video changes
      keepScroll = !wasHidden;
      document.title = `${item ? `${item[1]} — ` : ''}${page ? `${TSP_PAGES[page].heading} — ` : ''}Tulong sa Paggamit — Kuwenturo`;
      const had = tspPressed || (document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.tsp : null);
      tspPressed = null;
      renderTsp(page, item ? key : null);
      tspPage = page;
      if (wasHidden) $('tsp-title').focus();
      else if (turned) $('tsp-faq-title').focus({ preventScroll: true });
      else if (had && $(`tsp-btn-${had}`)) $(`tsp-btn-${had}`).focus();
    } else if (SECTIONS[section]) {
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
      const wasHidden = showView('view-dashboard');
      document.title = 'Dashboard — Kuwenturo';
      if (wasHidden) $('main').focus();
    }
    if (!keepScroll) window.scrollTo(0, 0);
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
    // The guide modal centres on the content column, not the whole window
    requestAnimationFrame(() => document.documentElement.style.setProperty('--stage-left', `${stage.getBoundingClientRect().left}px`));
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
  renderGabay();
  window.addEventListener('resize', syncSidebar);
  syncSidebar();
  window.addEventListener('hashchange', route);
  route();
})();
