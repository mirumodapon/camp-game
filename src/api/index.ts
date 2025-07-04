import questions from '#question'
import setup from '#setup'
import { Router } from 'express'

const router = Router()

router.get('/reset', (req, res) => {
  req.app.set('hints', setup())

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
    res.status(404).send({ message: 'incorrect' })
    return
  }

  res.status(200).send({ message: 'correct' })
})

export default router
