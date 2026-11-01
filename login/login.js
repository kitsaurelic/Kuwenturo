// Log-in page behaviour. No back end yet: log-in (email or Google) validates and opens the
// dashboard; create account leads through the profile steps; reset-password shows a confirmation.
// Passwords are never stored. The page has three views: #/ (log in), #/sign-up and #/profile/<1-3>.
(() => {
  const DASHBOARD_URL = '../dashboard/index.html';
  const MIN_PASSWORD = 8;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const $ = (id) => document.getElementById(id);
  const status = $('status');
  const store = {
    get(area, key) { try { return JSON.parse(area.getItem(key)); } catch { return null; } },
    set(area, key, value) { try { area.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ } },
  };

  function announce(message) {
    status.textContent = '';
    setTimeout(() => { status.textContent = message; }, 50);
  }

  function setError(input, message) {
    const error = $(`${input.id}-error`);
    if (error) error.textContent = message;
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    return !message;
  }

  function emailError(value) {
    if (!value) return 'Enter your email.';
    if (!EMAIL_RE.test(value)) return 'Enter an email like name@school.edu.ph.';
    return '';
  }

  function passwordError(value) {
    if (!value) return 'Enter your password.';
    if (value.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`;
    return '';
  }

  // Validate all, then move focus to the first invalid field
  function validate(form, checks) {
    const ok = checks.map(([input, message]) => setError(input, message)).every(Boolean);
    if (!ok) form.querySelector('[aria-invalid="true"]').focus();
    return ok;
  }

  document.querySelectorAll('form').forEach((form) => {
    form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', () => setError(input, ''));
    });
  });

  function startSession(email, provider, name) {
    store.set(sessionStorage, 'kuwenturo.session', { email, provider, name });
    window.location.href = DASHBOARD_URL;
  }

  // --- Log in ---
  const loginForm = $('login-form');
  const email = $('email');
  const password = $('password');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = email.value.trim();
    if (!validate(loginForm, [[email, emailError(value)], [password, passwordError(password.value)]])) {
      announce('Please fix the errors in the form.');
      return;
    }
    const submit = loginForm.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Logging in…';
    announce('Logging in.');
    startSession(value, 'email');
  });

  // --- Google log-in (placeholder until OAuth is connected) ---
  $('google-signin').addEventListener('click', (event) => {
    event.currentTarget.disabled = true;
    announce('Logging in with Google.');
    startSession('', 'google');
  });

  // --- Show / hide password ---
  document.querySelectorAll('.toggle-password').forEach((button) => {
    button.addEventListener('click', () => {
      const input = $(button.getAttribute('aria-controls'));
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.textContent = show ? 'Hide' : 'Show';
      button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  // --- Reset password dialog ---
  const forgotDialog = $('forgot-dialog');
  const forgotForm = $('forgot-form');
  const forgotEmail = $('forgot-email');

  document.querySelector('[data-open="forgot-dialog"]').addEventListener('click', (event) => {
    forgotForm.reset();
    setError(forgotEmail, '');
    forgotForm.querySelector('[data-step="form"]').hidden = false;
    forgotForm.querySelector('[data-step="done"]').hidden = true;
    event.currentTarget.focus(); // Safari doesn't focus buttons on click; the dialog restores focus here on close
    forgotDialog.showModal();
  });
  forgotDialog.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => forgotDialog.close());
  });
  forgotDialog.addEventListener('click', (event) => {
    if (event.target === forgotDialog) forgotDialog.close(); // backdrop click
  });
  forgotForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = forgotEmail.value.trim();
    if (!validate(forgotForm, [[forgotEmail, emailError(value)]])) return;
    forgotForm.querySelector('[data-step="form"]').hidden = true;
    const done = forgotForm.querySelector('[data-step="done"]');
    done.querySelector('[data-email]').textContent = value;
    done.hidden = false;
    done.querySelector('.dialog-title').focus();
  });

  // --- Create account ---
  const signupForm = $('signup-form');

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = $('signup-name');
    const signupEmail = $('signup-email');
    const pass = $('signup-password');
    const confirm = $('signup-confirm');
    const value = signupEmail.value.trim();

    const ok = validate(signupForm, [
      [name, name.value.trim() ? '' : 'Enter your full name.'],
      [signupEmail, emailError(value)],
      [pass, passwordError(pass.value)],
      [confirm, !confirm.value ? 'Confirm your password.'
        : confirm.value !== pass.value ? 'Passwords do not match.' : ''],
    ]);
    if (!ok) return;

    store.set(sessionStorage, 'kuwenturo.signup', { name: name.value.trim(), email: value });
    signupForm.reset();
    location.hash = '#/profile/1';
  });

  // --- Profile steps (Figma 4937:5018, 4937:6061, 4937:7133) ---
  // width: half the 2× export, so each sign keeps its size in the frame
  const STEPS = [
    {
      key: 'role', sign: 'setup-role', name: 'Role', prompt: 'Ano ang iyong tungkulin?', layout: 'one',
      choices: [
        { id: 'guro', label: 'Guro', img: 'setup-guro', width: 521 },
        { id: 'magulang', label: 'Magulang', img: 'setup-magulang', width: 560 },
      ],
    },
    {
      key: 'school', sign: 'setup-paaralan', name: 'Paaralan', prompt: 'Saang paaralan ka kabilang?', layout: 'two',
      choices: [
        { id: 'kamuning', label: 'Kamuning Elementary School', img: 'school-kamuning', width: 354 },
        { id: 'tomas-morato', label: 'Tomas Morato Elementary School', img: 'school-tomas-morato', width: 449 },
        { id: 'marcelo-del-pilar', label: 'Marcelo H. Del Pilar Elementary School', img: 'school-marcelo-del-pilar', width: 456 },
        { id: 'quirino', label: 'Quirino Elementary School', img: 'school-quirino', width: 412 },
        { id: 'eulogio-rodriguez', label: 'Eulogio Rodriguez Sr. Elementary School', img: 'school-eulogio-rodriguez', width: 415 },
        { id: 'ponciano-bernardo', label: 'Ponciano Bernardo Elementary School', img: 'school-ponciano-bernardo', width: 435 },
      ],
    },
    {
      key: 'section', sign: 'setup-seksyon', name: 'Seksyon', prompt: 'Anong baitang o seksyon?', layout: 'two',
      choices: [
        { id: 'Rosal', label: 'Rosal', img: 'section-rosal', width: 354 },
        { id: 'Ilang-Ilang', label: 'Ilang-Ilang', img: 'section-ilang-ilang', width: 449 },
        { id: 'Gumamela', label: 'Gumamela', img: 'section-gumamela', width: 456 },
        { id: 'Kalachuchi', label: 'Kalachuchi', img: 'section-kalachuchi', width: 412 },
        { id: 'Waling-Waling', label: 'Waling-Waling', img: 'section-waling-waling', width: 415 },
        { id: 'Sampaguita', label: 'Sampaguita', img: 'section-sampaguita', width: 435 },
      ],
    },
  ];
  const signup = () => store.get(sessionStorage, 'kuwenturo.signup');
  const saveSignup = (value) => store.set(sessionStorage, 'kuwenturo.signup', value);
  const stepHash = (number) => `#/profile/${number}`;

  function finishSetup() {
    const { name, email: address, role, school, section } = signup();
    store.set(localStorage, 'kuwenturo.profile', { name, email: address, role, school, section });
    sessionStorage.removeItem('kuwenturo.signup');
    startSession(address, 'signup', name);
  }

  function nextStep(number) {
    if (number < STEPS.length) location.hash = stepHash(number + 1);
    else finishSetup();
  }

  function renderStep(number) {
    const step = STEPS[number - 1];
    const chosen = signup()[step.key];
    $('setup-sign').src = `assets/${step.sign}.png`;
    $('setup-sign').alt = step.name;
    $('setup-prompt').textContent = step.prompt;
    $('setup-prev').disabled = number === 1;
    $('setup-next').disabled = !chosen;
    $('setup-choices').className = `setup-choices is-${step.layout}`;
    $('setup-choices').innerHTML = step.choices.map((c) => `
      <li><button type="button" class="setup-choice" data-choice="${c.id}" aria-pressed="${c.id === chosen}">
        <img src="assets/${c.img}.png" width="${c.width}" alt="${c.label}">
      </button></li>`).join('');
    [...$('setup-steps').children].forEach((bar, i) => {
      if (i === number - 1) bar.setAttribute('aria-current', 'step');
      else bar.removeAttribute('aria-current');
      bar.textContent = `Hakbang ${i + 1} ng ${STEPS.length}`;
    });
  }

  let currentStep = 1;
  $('setup-choices').addEventListener('click', (event) => {
    const button = event.target.closest('[data-choice]');
    if (!button) return;
    saveSignup({ ...signup(), [STEPS[currentStep - 1].key]: button.dataset.choice });
    nextStep(currentStep);
  });
  $('setup-prev').addEventListener('click', () => { location.hash = stepHash(currentStep - 1); });
  $('setup-next').addEventListener('click', () => nextStep(currentStep));

  // --- Views ---
  const VIEWS = { login: ['view-login', 'login-title', 'Log in'], signup: ['view-signup', 'signup-title', 'Create account'], setup: ['view-setup', 'setup-title', 'Ihanda ang Iyong Paglalakbay'] };

  function show(view) {
    const [id, title, name] = VIEWS[view];
    const changed = $(id).hidden;
    Object.values(VIEWS).forEach(([v]) => { $(v).hidden = v !== id; });
    document.body.classList.toggle('is-setup', view === 'setup');
    document.title = `${name} — Kuwenturo`;
    if (changed) { window.scrollTo(0, 0); $(title).focus({ preventScroll: true }); }
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, '');
    const step = hash.match(/^profile\/([1-3])$/);
    if (hash === 'sign-up') {
      show('signup');
    } else if (step) {
      const draft = signup();
      if (!draft) { location.replace('#/sign-up'); return; }
      // A step opens only once the ones before it are answered
      const open = STEPS.findIndex((s) => !draft[s.key]) + 1 || STEPS.length;
      const number = Math.min(Number(step[1]), open);
      if (number !== Number(step[1])) { location.replace(stepHash(number)); return; }
      const moved = number !== currentStep || $('view-setup').hidden;
      currentStep = number;
      renderStep(number);
      show('setup');
      if (moved) {
        $('setup-title').focus({ preventScroll: true });
        announce(`Hakbang ${number} ng ${STEPS.length}: ${STEPS[number - 1].prompt}`);
      }
    } else {
      show('login');
    }
  }
  window.addEventListener('hashchange', route);
  route();
})();
