
export function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('ag-theme') || 'dark';
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ag-theme', theme);
    if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '☼' : '☾';
  };
  setTheme(savedTheme);
  toggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}
