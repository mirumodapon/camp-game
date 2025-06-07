const hints = [
  { label: 'Mission 1', content: '誰是壞人？' },
  { label: 'Mission 4', content: '主席說：『會議開始吧！這次總共有 9 個人參加。』' },
  { label: 'Mission 6', content: '老三說：『不是老五吃的。』' },
  { label: 'Mission 2', content: 'E：「C 沒有說實話。」' },
  { label: 'Mission 6', content: '只有一個人吃了餅乾' },
  { label: 'Mission 3', content: 'C：「A 不是最後」' },
  { label: 'Mission 6', content: '誰吃了餅乾？' },
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
