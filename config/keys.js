import dotenv from 'dotenv'
dotenv.config()

export default {
    MongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.smmbi.mongodb.net/lonelyDev?retryWrites=true&w=majority`
}