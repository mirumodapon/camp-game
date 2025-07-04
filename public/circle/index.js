let main;
let nodes;
const center = {};
const touch = { mousedown: false };


function init() {
  main = document.getElementById('app');

  center.x = window.innerWidth / 2;
  center.y = window.innerHeight / 2;

  main.style.clipPath = `circle(var(--circle-size) at ${center.x}px ${center.y}px)`;

  help();
  render();
}

function render() {
  main.innerHTML = '';

  nodes = hints.forEach(hint => {
    const node = document.createElement('span');
    node.innerText = hint


    const x = window.innerWidth - node.clientWidth;
    const y = window.innerHeight - node.clientHeight;

    const randomX = Math.floor(Math.random() * x);
    const randomY = Math.floor(Math.random() * y);

    node.style.left = `${randomX}px`;
    node.style.top = `${randomY}px`;

    node.classList.add('hint');
    main.appendChild(node);

    return node
  });
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

function help() {
  const help = document.createElement('dialog')
  const content = document.createElement('div')
  const close = document.createElement('button')

  content.innerHTML = `
    <p>你可以拖動中間的圈圈，來試著偷看螢幕裡的線索</p>
    <p>這些線索每 3 秒會更換位置</p>
    <p>你能找出所有線索嗎</p>
  `

  close.innerHTML = '關閉'

  close.addEventListener('click', () => { help.close() })

  document.body.appendChild(help)
  content.appendChild(close)
  help.appendChild(content)
  help.showModal()
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('resize', onResize)

document.addEventListener('touchstart', onTouchStart, { passive: false });
document.addEventListener('touchmove', onTouchMove, { passive: false });
document.addEventListener('touchend', onTouchEnd, { passive: false });

document.addEventListener('mousedown', onTouchStart, { passive: false });
document.addEventListener('mousemove', onTouchMove, { passive: false });
document.addEventListener('mouseup', onTouchEnd, { passive: false });

setInterval(render, 3000);
