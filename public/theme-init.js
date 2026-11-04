// Apply the saved theme before first paint. Kept external for a strict script CSP.
(function () {
  var stored, personalMode, presentation;
  try {
    stored = localStorage.getItem('sathwikhs.mode');
    personalMode = localStorage.getItem('sathwikhs.personal.mode');
    presentation = localStorage.getItem('sathwikhs.presentation');
  } catch (e) {}
  presentation = location.hash === '#personal' || presentation === 'personal' ? 'personal' : 'professional';
  var mode = presentation === 'personal'
    ? (personalMode === 'paper' ? 'paper' : 'trace')
    : (stored === 'paper' || stored === 'trace' ? stored : matchMedia('(prefers-color-scheme: dark)').matches ? 'trace' : 'paper');
  var color = presentation === 'personal' ? (mode === 'trace' ? '#0B0D10' : '#F0F1F3') : (mode === 'trace' ? '#0E0F11' : '#E7E8EA');
  var root = document.documentElement;
  root.dataset.theme = mode;
  root.dataset.presentation = presentation;
  root.style.colorScheme = mode === 'trace' ? 'dark' : 'light';
  root.style.background = color;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', color);
})();
