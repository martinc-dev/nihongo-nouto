const { Router } = require('express')
const {
  NounTagController,
  NounTagRelController,
  NounController,
  AdvController,
  AdjController,
  VerbController
} = require('../controllers')

const registerCRUDEndpoints = ({ getMultiple, getOne, createOne, updateOne, deleteOne }) => {
  const router = Router()

  router.get('/', (req, res) => getMultiple(req, res))
  router.get('/:id', (req, res) => getOne(req, res))
  router.post('/', (req, res) => createOne(req, res))
  router.patch('/:id', (req, res) => updateOne(req, res))
  router.delete('/:id', (req, res) => deleteOne(req, res))

  return router
}

const router = Router()

router.use('/noun_tag', registerCRUDEndpoints(new NounTagController()))
router.use('/noun', registerCRUDEndpoints(new NounController()))
router.use('/noun_tag_rel', registerCRUDEndpoints(new NounTagRelController()))
router.use('/adv', registerCRUDEndpoints(new AdvController()))
router.use('/adj', registerCRUDEndpoints(new AdjController()))
router.use('/verb', registerCRUDEndpoints(new VerbController()))

module.exports = {
  router
}
