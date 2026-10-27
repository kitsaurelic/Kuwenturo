// Sign-in page behaviour. No back end yet: sign-in (email or Google) validates
// and opens the dashboard; reset-password and create-account show confirmations only.
(() => {
  const DASHBOARD_URL = '../dashboard/index.html';
  const MIN_PASSWORD = 8;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const $ = (id) => document.getElementById(id);
  const status = $('status');

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

  function startSession(email, provider) {
    try { sessionStorage.setItem('kuwenturo.session', JSON.stringify({ email, provider })); } catch { /* storage unavailable */ }
    window.location.href = DASHBOARD_URL;
  }

  // --- Email sign-in ---
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
    submit.textContent = 'Signing in…';
    announce('Signing in.');
    startSession(value, 'email');
  });

  // --- Google sign-in (placeholder until OAuth is connected) ---
  $('google-signin').addEventListener('click', (event) => {
    event.currentTarget.disabled = true;
    announce('Signing in with Google.');
    startSession('', 'google');
  });

  // --- Show / hide password ---
  document.querySelector('.toggle-password').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    button.textContent = show ? 'Hide' : 'Show';
    button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });

  // --- Dialogs ---

  function resetDialog(dialog) {
    const form = dialog.querySelector('form');
    form.reset();
    form.querySelectorAll('input').forEach((input) => setError(input, ''));
    form.querySelector('[data-step="form"]').hidden = false;
    form.querySelector('[data-step="done"]').hidden = true;
  }

  function showDone(dialog, address) {
    dialog.querySelector('[data-step="form"]').hidden = true;
    const done = dialog.querySelector('[data-step="done"]');
    done.querySelector('[data-email]').textContent = address;
    done.hidden = false;
    done.querySelector('.dialog-title').focus();
  }

  document.querySelectorAll('[data-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialog = $(trigger.dataset.open);
      resetDialog(dialog);
      trigger.focus(); // Safari doesn't focus buttons on click; the dialog restores focus here on close
      dialog.showModal();
    });
  });

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', () => dialog.close());
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close(); // backdrop click
    });
  });

  // --- Reset password ---
  const forgotForm = $('forgot-form');
  const forgotEmail = $('forgot-email');

  forgotForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = forgotEmail.value.trim();
    if (!validate(forgotForm, [[forgotEmail, emailError(value)]])) return;
    showDone($('forgot-dialog'), value);
  });

  // --- Create account ---
  const signupDialog = $('signup-dialog');
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

    signupDialog.dataset.email = value;
    showDone(signupDialog, value);
  });

  // After sign-up, carry the email into the sign-in form
  signupDialog.querySelector('[data-fill-login]').addEventListener('click', () => {
    email.value = signupDialog.dataset.email || '';
    setError(email, '');
    signupDialog.close(); // restores focus to the opener first…
    password.focus();     // …then move it to the next field to fill
  });
})();
