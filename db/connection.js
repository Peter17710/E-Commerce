import mongoose from "mongoose"; 
import "dotenv/config.js"

// export const connection = mongoose.connect("mongodb://localhost:27017/ecommerce")
export const connection = mongoose.connect(process.env.ONLINEBASEURL)
.then((res) => console.log('connected'))
.catch((error) => console.log("error"))