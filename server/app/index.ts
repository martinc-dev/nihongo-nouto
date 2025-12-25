import express, { Request, Response } from 'express'
import cors from 'cors' // TODO: Add auth
import env from '../env'
import { router } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.get('/status', (_req: Request, res: Response) => res.status(200).json('OK'))

app.use('/api', router)

app.listen(env.server.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${env.server.port}`)
})

