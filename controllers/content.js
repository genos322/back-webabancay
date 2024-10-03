import { randomUUID } from 'crypto'
import { validateContent, validatePartialContent } from '../schemas/content.js'
import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';


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
      fs.unlinkSync(req.file.path)// si no se cumple la validacion se borra el archivo
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    // return res.json( req.files.originalname[0].originalname )
    // const originalName = req.file.originalname
    // fs.renameSync(req.file.path, `uploads/${originalName}`)
    for(let i = 0; i < req.files.length; i++){
      const originalName = req.files[i].originalname;
      const extension = path.extname(originalName)
      const newNameFile = randomUUID()+extension

      result.data[`nameImage${i}`] = newNameFile
      console.log ('result.data', result.data)

      fs.renameSync(req.files[i].path, `uploads/${result.data[`nameImage${i}`]}`)//${req.files[i].originalname}
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
    let n= 0
    console.log('req.files', req.body)

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    while(n < 4){
      if(req.body[`nameImage${n}`] !== undefined){
        console.log('req.files', req.body)

        const filePath = path.join(__dirname, '..', 'uploads', req.body[`nameImage${n}`]);
        fs.unlinkSync(filePath);
        const originalName = req.files[n].originalname;
        const extension = path.extname(originalName)
        const newNameFile = randomUUID()+extension

        result.data[`nameImage${n}`] = newNameFile
        fs.renameSync(req.files[n].path, `uploads/${result.data[`nameImage${n}`]}`)//${req.files[i].originalname}
      }
      n++
    }
    const { id } = req.params

    const updateContent = await this.contentModel.update({ id, input: result.data })

    return res.json(updateContent)
  }
}
