import { Cart } from "../../../db/models/cart.model.js";
import { Order } from "../../../db/models/order.model.js";
import { Product } from "../../../db/models/product.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import appError from "../../utils/appError.js";
import Stripe from 'stripe';
import { deleteOne } from "../handlers/apiHandler.js";
const stripe = new Stripe('sk_test_51Q57XlGCaSSDGTYlKQXLlBF6J5IyVkegVXXiOSbPAILztQoatIA7DQ7mD5g8VmAR1d8o2vpZfxU1TTlV0dLZoxID00g9k9mA6t');


export const createOrder = handleAsyncError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id);

    let totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    console.log(cart);

    let order = new Order({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalPrice,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: "credit",
        isPaid: true
    })

    if (order) {
        let options = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
            }
        }


        ));

        await Product.bulkWrite(options)
        await order.save()
    } else {
        return next(new appError("error occur", 409))
    }
})
   
export const getOrder = handleAsyncError(async (req, res, next) => {

    let order = await Order.findOne({ user: req.user._id }).populate("cartItems.product")
    res.json({ message: "Done", order })

})

export const getAllOrders = handleAsyncError(async (req, res, next) => {

    let order = await Order.find({ user: req.user._id }).populate("cartItems.product")
    res.json({ message: "Done", order })

})

export const deleteOrder = deleteOne(Order) ;

export const onlinePayment = handleAsyncError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id);
    if (!cart) return next(new appError("cart not found", 404))
    let totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    let session = await stripe.checkout.sessions.create({

        line_items: [{
            price_data: {
                currency: "egp",
                unit_amount: totalPrice * 100,
                product_data: {
                    name: req.user.name,
                },
            },
            quantity: 1,
        },
        ],

        mode: "payment",
        success_url: "https://route-comm.netlify.app/#/",
        cancel_url: "https://route-comm.netlify.app/#/cart",
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    })

    res.json({ message: "Done", session })

})


export const createOnlineOrder = handleAsyncError(async (req, res, next) => {

})