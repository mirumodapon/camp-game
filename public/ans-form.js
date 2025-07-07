

function handleSubmit(e) {
  e.preventDefault();

  Array.from({ length: 6 }, (_, index) => index)
    .forEach(i => {
      const value = document.querySelector(`#mission${i + 1}`).value

      if (!value) return;

      fetch(`/api/answer/${i}/${value}`, {
        method: 'POST',
        body: JSON.stringify({
        })
      }).then(() => {
        document.querySelector(`#mission${i + 1}`).value = ''
      })
    })
}

function handleClose() {
    const dialog = document.querySelector('#ans-form')
    dialog.close()
}

function init() {
  const dialog = document.createElement('dialog')
  const form = document.createElement('form')

  dialog.id = 'ans-form'

  form.innerHTML = `
    <p>
      <label for="mission1">Mission 1</label>
      <input id="mission1" type="text" />
    </p>
    <p>
      <label for="mission2">Mission 2</label>
      <input id="mission2" type="text" />
    </p>
    <p>
      <label for="mission3">Mission 3</label>
      <input id="mission3" type="text" />
    </p>
    <p>
      <label for="mission4">Mission 4</label>
      <input id="mission4" type="text" />
    </p>
    <p>
      <label for="mission5">Mission 5</label>
      <input id="mission5" type="text" />
    </p>
    <p>
      <label for="mission6">Mission 6</label>
      <input id="mission6" type="text" />
    </p>
    <button type="button" onclick="handleClose()">關閉</button>
    <button type="submit">送出</button>
  `

  form.addEventListener('submit', handleSubmit)


  dialog.appendChild(form)
  document.body.appendChild(dialog)
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', (e) => {
  console.log(e)
  if (e.key === 'h' && e.ctrlKey) {
    const dialog = document.querySelector('#ans-form')
    dialog.showModal()
  }
});
