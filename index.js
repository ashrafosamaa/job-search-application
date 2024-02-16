import express from "express"
import db_connection from "./DB/connection.js"
import userRouter from "./src/modules/User/user.routes.js"
import companyRouter from "./src/modules/Company/company.routes.js"
import jobRouter from "./src/modules/Job/job.routes.js"
import { globalResponse } from "./src/middleware/globalResponse.js";
import { config } from "dotenv"

const app = express()
config({path: './config/dev.config.env'})

app.use(express.json())

app.use('/user', userRouter)
app.use('/company', companyRouter)
app.use('/job', jobRouter)

app.use(globalResponse)

const port = process.env.PORT

db_connection()

app.listen(port, ()=> {
    console.log(`runnig on port ${port}`)
})