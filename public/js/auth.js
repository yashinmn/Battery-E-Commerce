const isLogin = location.pathname.endsWith('/login.html');
const form = document.getElementById(isLogin ? 'login-form' : 'register-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let url, payload;
  if (isLogin) {
    url = '/api/auth/login';
    payload = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
  } else {
    url = '/api/auth/register';
    payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const out = await res.json();
  const statusEl = document.getElementById(isLogin ? 'login-status' : 'register-status');
  if (out.token) {
    setToken(out.token);
    statusEl.textContent = 'Success! Redirecting...';
    setTimeout(() => { window.location.href = '/products.html'; }, 500);
  } else {
    statusEl.textContent = out.error || 'Failed';
  }
});
