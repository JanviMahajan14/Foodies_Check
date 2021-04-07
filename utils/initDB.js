import mongoose from 'mongoose'

const initDB = async() => {
    if (mongoose.connections[0].readyState) {
        console.log('Already Connected!')
        return
    }
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connection.on('connected', () => {
        console.log("Connected to MongoDB")
    })
    mongoose.connection.on('error', (err) => {
        console.log("error connecting ", err)
    })
}

export default initDB;