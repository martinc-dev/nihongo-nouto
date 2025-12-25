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
    port: 3000,
  },
  database: {
    username: 'root',
    password: 'nihongo-nouto',
    host: 'localhost',
    port: 3306,
    name: 'nihongo-nouto',
  },
  environment: 'dev',
}

export default env

