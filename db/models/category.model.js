import mongoose, { Types } from "mongoose";
import "dotenv/config.js"

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true, 
        required: true
    },
    image: String,
    createdby: {
        type: Types.ObjectId,
        ref:'User'
    }, 
},
{timestamps: true , versionKey:false})

schema.pre("init" , function(doc){
    doc.image = process.env.BASEURL + "uploads/" + doc.image
})

export const Category = mongoose.model('Category' , schema)


