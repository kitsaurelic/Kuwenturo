// Log-in page behaviour. No back end yet: sign-in validates the form and
// opens the dashboard; sign-up and forgot-password show confirmations only.
(() => {
  const DASHBOARD_URL = '../dashboard/index.html';
  const REMEMBER_KEY = 'kuwenturo.remember';
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } },
    remove(key) { try { localStorage.removeItem(key); } catch { /* storage unavailable */ } },
  };

  function setError(input, message) {
    const error = document.getElementById(`${input.id}-error`);
    if (error) error.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  function clearErrorOnInput(form) {
    form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', () => setError(input, ''));
    });
  }

  function focusFirstInvalid(form) {
    const invalid = form.querySelector('[aria-invalid="true"]');
    if (invalid) invalid.focus();
  }

  // --- Log in ---
  const loginForm = document.getElementById('login-form');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const remember = document.getElementById('remember');

  const saved = storage.get(REMEMBER_KEY);
  if (saved) {
    try {
      const { user, role } = JSON.parse(saved);
      username.value = user || '';
      const radio = loginForm.querySelector(`input[name="role"][value="${role}"]`);
      if (radio) radio.checked = true;
      remember.checked = true;
    } catch { storage.remove(REMEMBER_KEY); }
  }

  clearErrorOnInput(loginForm);

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = username.value.trim();
    const pass = password.value;

    const ok = [
      setError(username, user ? '' : 'Ilagay ang iyong username o email.'),
      setError(password, !pass ? 'Ilagay ang iyong password.'
        : pass.length < 6 ? 'Ang password ay dapat may hindi bababa sa 6 na character.' : ''),
    ].every(Boolean);

    if (!ok) { focusFirstInvalid(loginForm); return; }

    const role = loginForm.querySelector('input[name="role"]:checked').value;
    if (remember.checked) storage.set(REMEMBER_KEY, JSON.stringify({ user, role }));
    else storage.remove(REMEMBER_KEY);

    try { sessionStorage.setItem('kuwenturo.session', JSON.stringify({ user, role })); } catch { /* storage unavailable */ }

    const submit = loginForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Sandali lang...';
    window.location.href = DASHBOARD_URL;
  });

  // --- Show / hide password ---
  document.querySelector('.toggle-password').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const showing = password.type === 'text';
    password.type = showing ? 'password' : 'text';
    button.textContent = showing ? 'Ipakita' : 'Itago';
    button.setAttribute('aria-pressed', String(!showing));
    password.focus();
  });

  // --- Dialogs ---
  function resetDialog(dialog) {
    const form = dialog.querySelector('form');
    form.reset();
    form.querySelectorAll('input').forEach((input) => setError(input, ''));
    form.querySelector('[data-step="form"]').hidden = false;
    form.querySelector('[data-step="done"]').hidden = true;
  }

  function showDone(dialog) {
    dialog.querySelector('[data-step="form"]').hidden = true;
    const done = dialog.querySelector('[data-step="done"]');
    done.hidden = false;
    done.querySelector('button').focus();
  }

  document.querySelectorAll('[data-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialog = document.getElementById(trigger.dataset.open);
      resetDialog(dialog);
      dialog.showModal();
    });
  });

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', () => dialog.close());
    });
    // Close when clicking the backdrop
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    clearErrorOnInput(dialog.querySelector('form'));
  });

  // --- Forgot password ---
  const forgotDialog = document.getElementById('forgot-dialog');
  const forgotForm = document.getElementById('forgot-form');
  const forgotEmail = document.getElementById('forgot-email');

  forgotForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = forgotEmail.value.trim();
    const ok = setError(forgotEmail, !email ? 'Ilagay ang iyong email.'
      : !EMAIL_RE.test(email) ? 'Hindi tama ang format ng email.' : '');
    if (!ok) { forgotEmail.focus(); return; }
    forgotDialog.querySelector('[data-email]').textContent = email;
    showDone(forgotDialog);
  });

  // --- Create account ---
  const signupDialog = document.getElementById('signup-dialog');
  const signupForm = document.getElementById('signup-form');
  const field = (id) => document.getElementById(id);

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = field('signup-name');
    const email = field('signup-email');
    const pass = field('signup-password');
    const confirm = field('signup-confirm');

    const ok = [
      setError(name, name.value.trim() ? '' : 'Ilagay ang iyong buong pangalan.'),
      setError(email, !email.value.trim() ? 'Ilagay ang iyong email.'
        : !EMAIL_RE.test(email.value.trim()) ? 'Hindi tama ang format ng email.' : ''),
      setError(pass, pass.value.length < 6 ? 'Ang password ay dapat may hindi bababa sa 6 na character.' : ''),
      setError(confirm, !confirm.value ? 'Ulitin ang iyong password.'
        : confirm.value !== pass.value ? 'Hindi magkapareho ang password.' : ''),
    ].every(Boolean);

    if (!ok) { focusFirstInvalid(signupForm); return; }

    signupDialog.dataset.email = email.value.trim();
    signupDialog.dataset.role = field('signup-role').value;
    showDone(signupDialog);
  });

  // After sign-up, fill the log-in form with the new account
  signupDialog.querySelector('[data-fill-login]').addEventListener('click', () => {
    username.value = signupDialog.dataset.email || '';
    const radio = loginForm.querySelector(`input[name="role"][value="${signupDialog.dataset.role}"]`);
    if (radio) radio.checked = true;
    setError(username, '');
    setTimeout(() => password.focus(), 0);
  });
})();
