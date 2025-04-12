import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short brand name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    logo: String,
    createdby: {
        type: Types.ObjectId,
        ref:'User'
    }, 
},
{timestamps: true , versionKey:false})

schema.pre("init" , function(doc){
    doc.logo = process.env.BASEURL + "uploads/" + doc.logo
})

export const brand = mongoose.model('brand' , schema)


