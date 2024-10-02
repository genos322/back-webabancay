import { randomUUID } from 'crypto'
import { validateContent, validatePartialContent } from '../schemas/content.js'
import fs from 'fs'
import path from 'path'

export class ContentController {
  constructor ({ contentModel }) {
    this.contentModel = contentModel
  }

  getAll = async (req, res) => {
    const content = await this.contentModel.getAll()
    res.json(content)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const content = await this.contentModel.getById({ id })
    if (content) return res.json(content)
    res.status(404).json({ message: 'Content not found' })
  }

  create = async (req, res) => {
    const result = validateContent(req.body)
    // console.log('req.filesss', req.body,'otroo',result)
    if (!result.success) {
    // 422 Unprocessable Entity
      fs.unlinkSync(req.file.path)
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    // return res.json( req.files.originalname[0].originalname )
    // const originalName = req.file.originalname
    // fs.renameSync(req.file.path, `uploads/${originalName}`)
    for(let i = 0; i < req.files.length; i++){
      `${result.data.nameImage+i}` = randomUUID() //uuid en js
      const originalName = req.files[i].originalname;
      const extension = path.extname(originalName)
      fs.renameSync(req.files[i].path, `uploads/${newContent.idContent+i+extension}`)//${req.files[i].originalname}
    }
    const newContent = await this.contentModel.create({ input: result.data })

    res.status(201).json(newContent)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.contentModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Content not found' })
    }

    return res.json({ message: 'Content deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialContent(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateContent = await this.contentModel.update({ id, input: result.data })

    return res.json(updateContent)
  }
}
