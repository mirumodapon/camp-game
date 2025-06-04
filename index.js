let main;
const center = {};
const touch = {
  mousedown: false
};

function init() {
  main = document.querySelector('main');

  center.x = window.innerWidth / 2;
  center.y = window.innerHeight / 2;

  main.style.clipPath = `circle(100px at ${center.x}px ${center.y}px)`;

  const hints_node = hints
    .map(hint => {
      const node = document.createElement('p');
      node.style.position = 'fixed';
      node.style.whiteSpace = 'nowrap';
      node.style.top = Math.random() * (window.innerWidth - 200) + 'px';
      node.style.left = Math.random() * (window.innerHeight - 200) + 'px';
      node.textContent = hint;
      return node;
    });

  hints_node.forEach(x => main.appendChild(x));

  setInterval(() => {
    hints_node.forEach(node => {
      node.style.top = Math.random() * (window.innerWidth - 200) + 'px';
      node.style.left = Math.random() * (window.innerHeight - 200) + 'px';
    })
  }, 5000);


}

function onResize() {
  center.x = window.innerWidth / 2;
  center.y = window.innerHeight / 2;
}

function onTouchStart(e) {
  e.preventDefault();

  if (e instanceof MouseEvent) {
    touch.x = e.clientX;
    touch.y = e.clientY;
    touch.mousedown = true;
  }

  if (e instanceof TouchEvent) {
    touch.x = e.touches[0].clientX;
    touch.y = e.touches[0].clientY;
  }
}

function onTouchMove(e) {
  e.preventDefault();

  let dx, dy;

  if (e instanceof MouseEvent) {
    dx = e.clientX - touch.x;
    dy = e.clientY - touch.y;

    if (!touch.mousedown) {
      return;
    }
  }

  if (e instanceof TouchEvent) {
    dx = e.touches[0].clientX - touch.x;
    dy = e.touches[0].clientY - touch.y;
  }

  main.style.clipPath = `circle(100px at ${center.x + dx}px ${center.y + dy}px)`;
}

function onTouchEnd(e) {
  e.preventDefault();

  if (e instanceof MouseEvent) {
    touch.mousedown = false;
  }

  main.style.clipPath = `circle(100px at ${center.x}px ${center.y}px)`;
}

function preventDefault(e) {
  e.preventDefault();
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('resize', onResize)
document.addEventListener('contextmenu', preventDefault, { passive: false });
document.addEventListener('keydown', preventDefault, { passive: false });

document.addEventListener('touchstart', onTouchStart, { passive: false });
document.addEventListener('touchmove', onTouchMove, { passive: false });
document.addEventListener('touchend', onTouchEnd, { passive: false });

document.addEventListener('mousedown', onTouchStart, { passive: false });
document.addEventListener('mousemove', onTouchMove, { passive: false });
document.addEventListener('mouseup', onTouchEnd, { passive: false });

setInterval(() => {
  const start = performance.now();
  debugger;
  const end = performance.now();
  if (end - start > 100) {
    alert('請不要開啟開發者工具');
  }
}, 1000);
