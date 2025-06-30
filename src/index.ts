import { createServer } from 'node:http'
import { join } from 'node:path'
import { cwd } from 'node:process'
import api from '#api/index'
import setup from '#setup'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.set('io', io)
app.set('hints', setup())
app.set('player', 6)
app.use('/api', api)

app.use(express.static(join(cwd(), 'public')))

server.listen(
  3000,
  // eslint-disable-next-line no-console
  () => void console.log('listening on port 3000'),
)
