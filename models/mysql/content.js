import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'dbwebabancay'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class ContentModel {
  static async getAll () {

	const [content] = await connection.query(
	  'SELECT * FROM tcontent;'
	)

	return content
  }

  static async getById ({ id }) {
	const [content] = await connection.query(
	  `SELECT * FROM tcontent WHERE idContent = '${id}';`,
	  [id]
	)

	if (content.length === 0) return null

	return content[0]
  }

  static async create ({ input }) {
	let {
	  title,
	  mainContent,
	  nameImage,
	  nameImage1,
	  nameImage2,
	  location,
	  entryPrice,
	  timeTravel
	} = input
	console.log('Datos recibidos:', input);

	entryPrice = parseFloat(entryPrice)//number() parsea en tipo number y no en tipo flo
	timeTravel = parseFloat(timeTravel)
	if (isNaN(entryPrice) || isNaN(timeTravel)) {
		throw new Error('entryPrice debe ser un número válido');
	  }
	// crypto.randomUUID()
	const [uuidResult] = await connection.query('SELECT UUID() uuid;')
	const [{ uuid }] = uuidResult

	try {		  
	  await connection.query(
		`INSERT INTO tcontent (idContent, title, mainContent, nameImage, nameImage1, nameImage2, location, entryPrice, timeTravel)
		  VALUES ("${uuid}", ?, ?, ?, ?, ?, ?, ?, ?);`,
		[title, mainContent, nameImage, nameImage1, nameImage2, location, entryPrice, timeTravel]
	  )
	} catch (e) {
	  // puede enviarle información sensible
	  throw new Error(e)
	  // enviar la traza a un servicio interno
	  // sendLog(e)
	}

	const [content] = await connection.query(
	  `SELECT *
		FROM tcontent WHERE idContent = ?;`,
	  [uuid]
	)

	return content[0]
  }

  static async delete ({ id }) {
	  try{
		const [content] = await connection.query(
			'DELETE FROM tcontent WHERE idContent = ?;',
			[id]
		  )
	  } catch(e){
		throw new Error('Error deleting content'+e)
	  }
  }

  static async update ({ id, input }) {
	const {
	  title,
	  mainContent,
	  nameImage,
	  nameImage1,
	  nameImage2,
	  location,
	  entryPrice,
	  timeTravel
	} = input

	try{
		const [content] = await connection.query(
		`UPDATE tcontent SET title = ?, mainContent = ?, nameImage = ?, nameImage1 = ?, nameImage2 = ?, location = ?, entryPrice = ?, timeTravel = ?
		WHERE idContent = ?;`,
		[title, mainContent, nameImage, nameImage1, nameImage2, location, entryPrice, timeTravel, id]
		)	 
	}catch(e){
		throw new Error("Error updating content"+e)
	}

	const [content] = await connection.query(
		'SELECT * FROM tcontent WHERE idContent = ?;',
		[id]
		)
	return content[0]
  }
}
