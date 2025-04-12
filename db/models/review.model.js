import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min:0,
        max:5
    },
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Types.ObjectId,
        ref: "Product"
    }
    
},
{timestamps: true , versionKey:false})

schema.pre(/^find/ , function () {    
    this.populate('userId' , 'name')})   

export const Review = mongoose.model('Review' , schema)


