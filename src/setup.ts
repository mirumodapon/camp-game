import questions from '#question'

export default function setup() {
  const hints = questions
    .flatMap(({ hints, label }) => hints.map(hint => `[${label}]: ${hint}`))

  for (let i = 0; i < hints.length; i++) {
    const index = i + Math.floor(Math.random() * (hints.length - i))

    const temp = hints[i]
    hints[i] = hints[index]
    hints[index] = temp
  }

  return hints
}
