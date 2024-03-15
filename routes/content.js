import { Router } from 'express'
import { ContentController } from '../controllers/content.js'
import multer from 'multer'

export const createContentRouter = ({ contentModel }) => {
  const contentRouter = Router()
  const upload = multer({ dest: 'uploads/' })

  const contentController = new ContentController({ contentModel })

  contentRouter.get('/', contentController.getAll)
  contentRouter.post('/', upload.single('test'), contentController.create)

  contentRouter.get('/:id', contentController.getById)
  contentRouter.delete('/:id', contentController.delete)
  contentRouter.patch('/:id', contentController.update)

  return contentRouter
}
