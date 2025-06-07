const hints = [
  { label: 'Mission 3', content: 'A：「B 在我前面」' },
  { label: 'Mission 3', content: '三個人排序是什麼？' },
  { label: 'Mission 4', content: '所有人圍坐在一圓桌旁' },
  { label: 'Mission 6', content: '且五兄弟裡只有三個人說了實話' },
  { label: 'Mission 1', content: 'C：「我不是好人」' },
  { label: 'Mission 2', content: '有一個人說謊，還有一個人洩漏了機密' },
]

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

  render()
}

function render() {
  for (let i = 0; i < hints.length; i++) {
    const index = i + Math.floor(Math.random() * (cards.length - i));

    cards[i].querySelector('.back').innerText = '';
    cards[index].querySelector('.back').innerText = 
      `${hints[i].label}: ${hints[i].content}`;

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
    }, 500);
  }
}

customElements.define('sitcon-card', Card);
document.addEventListener('DOMContentLoaded', init);
setInterval(render, 2000);
