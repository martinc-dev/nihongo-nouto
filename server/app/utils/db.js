/* eslint-disable new-cap, no-console */
const Sequelize = require('sequelize')
const env = require('../../env')

const getDBConnection = () =>
  new Sequelize(env.database.name, env.database.username, env.database.password, {
    host: env.database.host,
    port: env.database.port,
    dialect: 'mysql',
  })
const testConnectionAsync = async () => {
  try {
    await getDBConnection().authenticate()

    console.log('Database Connected')

    return true
  } catch (err) {
    console.error('Cannot connect to the database:', err)

    return false
  }
}

module.exports = {
  getDBConnection,
  testConnectionAsync,
}
