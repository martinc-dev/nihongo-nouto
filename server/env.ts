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
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'nihongo-nouto',
    host: process.env.DB_HOST || 'localhost',
    // eslint-disable-next-line no-magic-numbers
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || 'nihongo-nouto',
  },
  environment: process.env.NODE_ENV || 'dev',
}

export default env
