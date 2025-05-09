import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    cartItems: [{
        product: {type: mongoose.Types.ObjectId , ref: 'Product'},
        quantity:{type: Number , default: 1} ,
        price: Number
    }],
    totalPrice: Number ,
    discount: Number ,
    totalPriceAfterDiscount: Number ,
},
{timestamps: true , versionKey:false})

export const Cart = mongoose.model('Cart' , schema)


