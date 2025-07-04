import questions from '#question'
import setup from '#setup'
import { Router } from 'express'

const router = Router()

router.get('/reset', (req, res) => {
  req.app.set('hints', setup())
  req.app.set('status', ['-', '-', '-', '-', '-', '-'])

  res.status(200).send({ message: 'Completes' })
})

router.put('player', (req, res) => {
  req.app.set('player', +(req.query.player ?? 6))
  res.status(200).send({ message: 'Completes' })
})

router.get('/player', (req, res) => {
  res.status(200).send({ player: req.app.get('player') })
})

router.get('/hints', (req, res) => {
  res.status(200).send({ hints: req.app.get('hints') })
})

router.get('/hints/player/:player', (req, res) => {
  const hints: string[] = req.app.get('hints')
  const player = req.app.get('player')
  const result = hints.filter((_, index) => index % player === +req.params.player - 1)
  res.status(200).send({ hints: result })
})

router.post('/answer/:question/:answer', (req, res) => {
  const question = questions[+req.params.question]
  const answer = req.params.answer

  if (!question) {
    res.status(404).send({ message: 'Question not found' })
    return
  }

  if (!question.answers.includes(answer)) {
    const status = req.app.get('status')
    status[+req.params.question] = 'incorrect ❌'
    req.app.set('status', status)
    res.status(404).send({ message: 'incorrect' })
    return
  }

  const status = req.app.get('status')
  status[+req.params.question] = 'correct ✅'
  req.app.set('status', status)

  res.status(200).send({ message: 'correct' })
})

router.get('/status', (req, res) => {
  res.status(200).send({ status: req.app.get('status') })
})

export default router
