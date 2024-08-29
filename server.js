import express from "express"
import { connection } from "./db/connection.js"
import { bootstrap } from "./src/modules/Bootstrap.js"
import appError from "./src/utils/appError.js"
import { globalError } from "./src/utils/globalError.js"

const app = express()

app.use(express.json())
connection
bootstrap(app)
app.get("/" , (req,res,next)=>{
    res.json("Hello")
})


app.use("**" , (req,res,next)=>{
    next(new appError("invalid url" , 404))
}) 

app.use(globalError)


app.listen(3000 , ()=>{console.log("Server is running!"); 
})