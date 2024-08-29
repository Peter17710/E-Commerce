import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        unique: true
    },
    expire: Date,
    status: {
        type: Boolean,
        enum:["active" , "inactive"],
        default: "active"
    },
    discount: {
        min: 1,
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


