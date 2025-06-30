document.addEventListener(
  'contextmenu',
  (e) => void e.preventDefault(),
  { passive: false }
);

setInterval(() => {
  const start = performance.now();
  debugger;
  const end = performance.now();
  if (end - start > 100) {
    alert('請不要開啟開發者工具');
  }
}, 1000);

