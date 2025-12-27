import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import env from '../env'
import { router } from './routes'
import { getDBConnection } from './utils/db'

const app = express()

app.use(cors())
app.use(express.json())
app.get('/status', (_req: Request, res: Response) => res.status(200).json('OK'))

app.use('/api', router)

// Serve static files in production
if (env.environment === 'production') {
  const buildPath = path.join(__dirname, '../../client')

  app.use(express.static(buildPath))

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(buildPath, 'index.html'))
  })
}

const startServer = async () => {
  try {
    const db = getDBConnection()

    await db.authenticate()
    // Console.log('Database connected')

    // Optional: Sync models if needed (be careful in production)
    // Await db.sync()

    app.listen(env.server.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening on port ${env.server.port}`)
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}

startServer()
