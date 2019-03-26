import chalk from 'chalk'
import mongoose, { Document } from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const DEFAULT_DB_OPTIONS: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_SAFE_INTEGER,
  reconnectInterval: 1000,
}

export const createSchema = (
  definition: mongoose.SchemaDefinition,
  options?: mongoose.SchemaOptions,
) => {
  const schema = new mongoose.Schema(definition, {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
    ...options,
  })
  schema.plugin(mongooseDelete, { deletedAt: true })
  return schema
}

export const createConnection = (
  uri: string = process.env.MONGO_URI,
  options: mongoose.ConnectionOptions = {},
) => {
  const connection = mongoose.createConnection(uri, {
    ...DEFAULT_DB_OPTIONS,
    ...options,
  })
  /* istanbul ignore next line */
  connection.on('connect', () => console.info(`✅  MongoDB connected: ${chalk.green(uri)}`))
  /* istanbul ignore next line */
  connection.on('error', (error) => {
    console.error(`❌ Couldn't connect to MongoDB at ${chalk.redBright(uri)}`, error)
    throw error
  })
  /* istanbul ignore next line */
  connection.on('disconnected', () => {
    console.warn(`❌ Disconnected from MongoDB at ${chalk.redBright(uri)}`)
  })

  return connection
}

export const createModel = <IDocument extends Document>(
  modelName: string,
  schema: mongoose.Schema,
  mongoUri?: string,
) => {
  const connection = createConnection(mongoUri)

  return connection.model<IDocument>(modelName, schema)
}
