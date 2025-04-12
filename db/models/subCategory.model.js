import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short subcategory name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    image: String,
    category: {
        type: Types.ObjectId,
        ref: 'Category'
    },
    
    createdby: {
        type: Types.ObjectId,
        ref:'User'
    }, 
},
{timestamps: true , versionKey:false})

export const subCategory = mongoose.model('subCategory' , schema)


