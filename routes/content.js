import { Router } from 'express'
import { ContentController } from '../controllers/content.js'

export const createContentRouter = ({ contentModel }) => {
  const contentRouter = Router()

  const contentController = new ContentController({ contentModel })

  contentRouter.get('/', contentController.getAll)
  contentRouter.post('/', contentController.create)

  contentRouter.get('/:id', contentController.getById)
  contentRouter.delete('/:id', contentController.delete)
  contentRouter.patch('/:id', contentController.update)

  return contentRouter
}
