import { Router, Request, Response } from 'express'
import {
  NounTagController,
  NounTagRelController,
  NounController,
  OtherController,
  AdjController,
  VerbController,
} from '../controllers'

interface CRUDEndpoints {
  isSearchable: boolean
  getMultiple: (req: Request, res: Response) => Promise<void>
  getOne: (req: Request, res: Response) => Promise<void>
  createOne: (req: Request, res: Response) => Promise<void>
  updateOne: (req: Request, res: Response) => Promise<void>
  deleteOne: (req: Request, res: Response) => Promise<void>
  getMultipleByWord: (req: Request, res: Response) => Promise<void>
}

const registerCRUDEndpoints = ({
  isSearchable,
  getMultiple,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getMultipleByWord,
}: CRUDEndpoints): Router => {
  const router = Router()

  if (isSearchable) router.get('/search', (req, res) => getMultipleByWord(req, res))

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
router.use('/other', registerCRUDEndpoints(new OtherController()))
router.use('/adj', registerCRUDEndpoints(new AdjController()))
router.use('/verb', registerCRUDEndpoints(new VerbController()))

export { router }

