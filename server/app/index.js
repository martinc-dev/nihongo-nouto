const express = require('express')
const cors = require('cors') // TODO: Add auth
const {
  server: { port },
} = require('../env')
const { router } = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.get('/status', (req, res) => res.status(200).json('OK'))

app.use('/api', router)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`)
})
