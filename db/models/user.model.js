import mongoose, { Types } from "mongoose";
import { type } from "os";
import { boolean } from "webidl-conversions";

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    confirmEmail:{
        type: Boolean,
        default: false
    },
    isBlocked:{
        type: Boolean,
        default: false
    }
   
},
{timestamps: true , versionKey:false})

export const User = mongoose.model('User' , schema)


