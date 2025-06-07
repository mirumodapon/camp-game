const hints = [
  { label: 'Mission 2', content:  'A：「不是我，也不是 C。」' } ,
  { label: 'Mission 4', content: '某研討會上，有誠實國跟說謊國的學者們參加' },
  { label: 'Mission 4', content: '每個人都說坐在自己右邊的是說謊國的人' },
  { label: 'Mission 6', content: '老大說：『是老四吃的。』' },
  { label: 'Mission 6', content: '老二說：『我沒有吃。』' },
  { label: 'Mission 1', content: '好人只會說實話，壞人只會說謊' },
]

let main;
let nodes;
const center = {};
const touch = { mousedown: false };


function init() {
  main = document.getElementById('app');

  center.x = window.innerWidth / 2;
  center.y = window.innerHeight / 2;


  nodes = hints.map(hint => {
    const node = document.createElement('span');
    node.innerText = `[${hint.label}]: ${hint.content}`;

    return node
  });

  main.style.clipPath = `circle(var(--circle-size) at ${center.x}px ${center.y}px)`;

  nodes.forEach(node => {
    node.classList.add('hint');
    main.appendChild(node);
  });

  render();
}

function render() {

  nodes.forEach((node) => {
    const x = window.innerWidth - node.clientWidth;
    const y = window.innerHeight - node.clientHeight;

    const randomX = Math.floor(Math.random() * x);
    const randomY = Math.floor(Math.random() * y);

    node.style.left = `${randomX}px`;
    node.style.top = `${randomY}px`;
  })


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


document.addEventListener('DOMContentLoaded', init);
document.addEventListener('resize', onResize)

document.addEventListener('touchstart', onTouchStart, { passive: false });
document.addEventListener('touchmove', onTouchMove, { passive: false });
document.addEventListener('touchend', onTouchEnd, { passive: false });

document.addEventListener('mousedown', onTouchStart, { passive: false });
document.addEventListener('mousemove', onTouchMove, { passive: false });
document.addEventListener('mouseup', onTouchEnd, { passive: false });

setInterval(render, 3000);
