/* eslint-disable new-cap, no-console */
import { Sequelize } from 'sequelize'
import env from '../../env'

export const getDBConnection = (): Sequelize =>
  new Sequelize(env.database.name, env.database.username, env.database.password, {
    host: env.database.host,
    port: env.database.port,
    dialect: 'mysql',
  })

export const testConnectionAsync = async (): Promise<boolean> => {
  try {
    await getDBConnection().authenticate()

    console.log('Database Connected')

    return true
  } catch (err) {
    console.error('Cannot connect to the database:', err)

    return false
  }
}
