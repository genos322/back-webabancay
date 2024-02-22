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
	  `SELECT *
		FROM tcontent WHERE id = idContent;`,
	  [id]
	)

	if (content.length === 0) return null

	return content[0]
  }

  static async create ({ input }) {
	const {
	  title,
	  mainContent,
	  imageExtension,
	  imageExtension1,
	  imageExtension2,
	  location,
	  entryPrice,
	  timeTravel
	} = input

	// crypto.randomUUID()
	const [uuidResult] = await connection.query('SELECT UUID() uuid;')
	const [{ uuid }] = uuidResult

	try {
	  await connection.query(
		`INSERT INTO movie (id, title, mainContent, imageExtension, imageExtension1, imageExtension2, location, entryPrice, timeTravel)
		  VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?);`,
		[title, mainContent, imageExtension, imageExtension1, imageExtension2, location, entryPrice, timeTravel]
	  )
	} catch (e) {
	  // puede enviarle información sensible
	  throw new Error('Error creating content')
	  // enviar la traza a un servicio interno
	  // sendLog(e)
	}

	const [content] = await connection.query(
	  `SELECT *
		FROM movie WHERE id = UUID_TO_BIN(?);`,
	  [uuid]
	)

	return content[0]
  }

  static async delete ({ id }) {
	  try{
		const [content] = await connection.query(
			'DELETE FROM tcontent WHERE id = ?;',
			[id]
		  )
	  } catch(e){
		throw new Error('Error deleting content')
	  }
  }

  static async update ({ id, input }) {
	const {
	  title,
	  mainContent,
	  imageExtension,
	  imageExtension1,
	  imageExtension2,
	  location,
	  entryPrice,
	  timeTravel
	} = input

	try{
		const [content] = await connection.query(
		`UPDATE tcontent SET title = ?, mainContent = ?, imageExtension = ?, imageExtension1 = ?, imageExtension2 = ?, location = ?, entryPrice = ?, timeTravel = ?
		WHERE id = ?;`,
		[title, mainContent, imageExtension, imageExtension1, imageExtension2, location, entryPrice, timeTravel, id]
		)	 
	}catch(e){
		throw new Error('Error updating content')
	}

	const [content] = await connection.query(
		'SELECT * FROM tcontent WHERE id = ?;',
		[id]
		)
	return content[0]
  }
}
