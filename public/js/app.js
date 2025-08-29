function getToken() { return localStorage.getItem('token'); }
function setToken(t) { localStorage.setItem('token', t); }
function clearToken() { localStorage.removeItem('token'); }
function authHeader() {
  const t = getToken();
  return t ? { 'Authorization': 'Bearer ' + t } : {};
}

(function initNav(){
  const token = getToken();
  const uLabel = document.getElementById('user-label');
  if (token) {
    uLabel.textContent = 'Logged in';
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
  } else {
    if (uLabel) uLabel.textContent = '';
  }
})();
