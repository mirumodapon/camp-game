const hints = [
  { label: 'Mission 6', content: '媽媽剛烤好放在桌上的餅乾被吃光了' },
  { label: 'Mission 6', content: '老五說：『二哥說的是實話。』' },
  { label: 'Mission 4', content: '這個會議到底有多少人參加？' },
  { label: 'Mission 1', content: 'A：「我不是壞人」' },
  { label: 'Mission 2', content: 'B：「A 沒有洩漏資料。」' },
  { label: 'Mission 3', content: 'B：「C 不是最後」' },
  { label: 'Mission 2', content: 'D：「不是 B 洩漏的。」' },
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
    }, 1000);
  }
}

customElements.define('sitcon-card', Card);
document.addEventListener('DOMContentLoaded', init);
setInterval(render, 2000);
