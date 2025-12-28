import path from 'path'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../.env') })
}

export interface EnvConfig {
  server: {
    port: number
  }
  database: {
    username: string
    password: string
    host: string
    port: number
    name: string
  }
  environment: string
}

const env: EnvConfig = {
  server: {
    // eslint-disable-next-line no-magic-numbers
    port: Number(process.env.PORT) || 3000,
  },
  database: {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    // eslint-disable-next-line no-magic-numbers
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || '',
  },
  environment: process.env.NODE_ENV || 'development',
}

export default env
