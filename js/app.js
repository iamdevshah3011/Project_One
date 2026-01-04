// /elevate-ai-project/js/app.js
document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  // Apply saved theme or default to light
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    htmlEl.classList.add('dark');
    htmlEl.classList.remove('light');
    themeToggle.textContent = '☀️';
  } else {
    htmlEl.classList.add('light');
    htmlEl.classList.remove('dark');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    if (htmlEl.classList.contains('dark')) {
      htmlEl.classList.replace('dark', 'light');
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      htmlEl.classList.replace('light', 'dark');
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
});
