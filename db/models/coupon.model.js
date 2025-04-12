import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        unique: true
    },
    expire: String,
    status: {
        type: String,
        enum:["active" , "inactive"],
        default: "active"
    },
    discount: {
        type: Number ,
        min: 0,
        required: true
    },
    type: {
        type: String,
        enum: ["prec" , "fixed"],
        default: "fixed"
    }
    
},
{timestamps: true , versionKey:false})

export const Coupon = mongoose.model('Coupon' , schema)


