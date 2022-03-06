import dotenv from "dotenv";
dotenv.config();

const MongoURI =
`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.smmbi.mongodb.net/lonelyDev?retryWrites=true&w=majority`;

export default MongoURI;
