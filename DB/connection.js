import mongoose from "mongoose";

const db_connection = async ()=> {
    await mongoose.connect(process.env.CONNECTION_URL_LOCAL)
    .then(()=> console.log("DB connected success"))
    .catch((err)=> console.log("DB connection fail", err))
}

export default db_connection