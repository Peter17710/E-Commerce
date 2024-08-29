import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    rate: {
        type: Number,
        required: true,
        min:0,
        max:5
    },
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    ProductId: {
        type: Types.ObjectId,
        ref: "Product"
    }
    
},
{timestamps: true , versionKey:false})

export const Review = mongoose.model('Review' , schema)


