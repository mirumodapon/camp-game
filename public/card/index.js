let main;
let cards;

function init() {
  main = document.getElementById('app');

  cards = Array
    .from({ length: 21 })
    .fill(null)
    .map(() => {
      const card = document.createElement('sitcon-card');
      return card
    })

  cards.forEach(card => {
    main.appendChild(card);
  })

  help()
  render()
}

function render() {
  for (let i = 0; i < hints.length; i++) {
    const index = i + Math.floor(Math.random() * (cards.length - i));

    cards[i].querySelector('.back').innerText = '';
    cards[index].querySelector('.back').innerText = hints[i];

    [cards[i], cards[index]] = [cards[index], cards[i]];
  }
}

class Card extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="card">
        <div class="wrapper">
            <span class="front">${this.innerText}</span>
            <span class="back"></span>
        </div>
      </div>
    `

    this.addEventListener('click', this.handleClick, { passive: true });
  }

  handleClick(e) {
    const el = e.currentTarget;
    el.classList.toggle('flipped');

    setTimeout(() => {
      el.classList.toggle('flipped');
    }, 1000);
  }
}

function help() {
  const help = document.createElement('dialog')
  const content = document.createElement('div')
  const close = document.createElement('button')

  content.innerHTML = `
    <p>這裡總共有 15 張卡片</p>
    <p>並且每個線索會隨機出現在卡片後方，每 20 秒會重新洗牌</p>
    <p>試著找出所有線索</p>
    <p>你可以透過按下 <kbd>Ctrl</kbd> + <kbd>h</kbd> 打開答案提交</p>
  `

  close.innerHTML = '關閉'

  close.addEventListener('click', () => { help.close() })

  document.body.appendChild(help)
  content.appendChild(close)
  help.appendChild(content)
  help.showModal()
}

customElements.define('sitcon-card', Card);
document.addEventListener('DOMContentLoaded', init);
setInterval(render, 2000);
