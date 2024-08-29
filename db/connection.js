import { error } from "console";
import mongoose from "mongoose";

export const connection = mongoose.connect("mongodb://localhost:27017/ecommerce")
.then((res) => console.log('connected'))
.catch((error) => console.log("error"))

