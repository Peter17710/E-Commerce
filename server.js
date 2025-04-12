import express from "express"
import { connection } from "./db/connection.js"
import { bootstrap } from "./src/modules/Bootstrap.js"
import appError from "./src/utils/appError.js"
import { globalError } from "./src/utils/globalError.js"
import cors from "cors"
import "dotenv/config.js"
const app = express()

app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use(cors())

connection
bootstrap(app)
app.get("/", (req, res, next) => {
    res.json("Server is running!!")
})


app.use("**", (req, res, next) => {
    next(new appError("invalid url", 404))
}) 

app.use(globalError)
 
app.listen(process.env.PORT, () => {
    console.log("Server is running");
})