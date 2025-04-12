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
    paymentMethod: {
        type: String,
        enums: ["cash" , "credit"],
        default: "cash"
    },

    shippingAddress: {
        city: String,
        street: String
    },

    isPaid: {
        type: Boolean,
        paidAt: Date,
        isDelivered:Boolean
    },
    
},
{timestamps: true , versionKey:false})

export const Order = mongoose.model('Order' , schema)


