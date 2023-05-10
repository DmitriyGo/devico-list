import { connect } from 'mongoose'

const connectToMongo = async () => {
  const connectionString = process.env.DATABASE_CONNECTION_STRING

  try {
    await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ Successfully connected to MongoDB Atlas')
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error)
  }
}

export default connectToMongo
