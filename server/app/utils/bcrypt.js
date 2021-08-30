const bcrypt = require('bcrypt')
const saltRounds = 10

const getHashed = clearText => bcrypt.hashSync(clearText, saltRounds)
const checkHashed = (clearText, hashed) => bcrypt.compareSync(clearText, hashed)

module.exports = {
  getHashed,
  checkHashed,
}
