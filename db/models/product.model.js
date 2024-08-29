import mongoose, { Types } from "mongoose";
import { type } from "os";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short product name']
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [50, 'too short description']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    imageCover: String,
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    sold: Number,
    stock:{
        type: Number,
        min: 0
    },
    category: {
        type: Types.ObjectId,
        ref:'Category'
    },
    subCategory: {
        type: Types.ObjectId,
        ref:'subCategory'
    },
    brand: {
        type: Types.ObjectId,
        ref:'brand'
    },
    rateCount:Number,
    rateAvg:Number,
    rate: {
        type: Number,
        min:0 ,
        max:5
    },


    createdby: {
        type: Types.ObjectId,
        ref:'User'
    }, 
},
{timestamps: true , versionKey:false})

export const Product = mongoose.model('Product' , schema)


