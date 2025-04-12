import { Cart } from "../../../db/models/cart.model.js";
import { Coupon } from "../../../db/models/coupon.model.js";
import { Product } from "../../../db/models/product.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import appError from "../../utils/appError.js";

function calcPrice(cart) {
    let totalPrice = 0;
    cart.cartItems.forEach((e) => {
        totalPrice += e.quantity * e.price
    })
    cart.totalPrice = totalPrice
}

export const addCart = handleAsyncError(async (req, res, next) => {

    req.body.user = req.user._id     //(protected routes)

    let isCart = await Cart.findOne({ user: req.user._id })
    let results = await Product.findById(req.body.product).select("price")
    !results && next(appError("product not found", 404))
    req.body.price = results.price

    if (!isCart) {
        let cart = new Cart({
            user: req.user._id,
            cartItems: [req.body]
        });
        calcPrice(cart)
        await cart.save();
        return res.status(201).json({ message: "created", cart })
    }

    let item = isCart.cartItems.find((e) => e.product == req.body.product)

    if (item) {
        item.quantity += 1
    } else {
        isCart.cartItems.push(req.body)
    }
    calcPrice(isCart)
    await isCart.save()
    res.json({ message: "done", isCart })
})



export const getCart = handleAsyncError(async(req,res,next)=>{
    let cart = await Cart.findOne({user: req.user._id})

    res.json({message: "Done" , cart})
})


export const removeCartItem = handleAsyncError(async(req,res,next)=>{
    let cart = await Cart.findOneAndUpdate({user: req.user._id} , {$pull:{cartItems:{_id:req.params.id}}} , {new:true})

    res.json({message: "deleted" , cart})})


    export const updateCart = handleAsyncError(async (req, res, next) => {

        req.body.user = req.user._id     //(protected routes)
    
        let isCart = await Cart.findOne({ user: req.user._id })
        let results = await Product.findById(req.body.product).select("price")
        !results && next(new appError("product not found", 404))
        req.body.price = results.price
    
        let item = isCart.cartItems.find((e) => e.product == req.body.product)
        
        !item && next(new appError("not found" , 404))
        if (item) {
            item.quantity = req.body.quantity
        }
        calcPrice(isCart)
        await isCart.save()
        res.json({ message: "done", isCart })
    })


    export const applyCoupon = handleAsyncError(async (req, res, next) => {
        
        let code = await Coupon.findOne({_id:req.params.code})
        let cart = await Cart.findOne({user:req.user._id})
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount) / 100
        cart.discount = code.discount;
        await cart.save()
        res.json({message: "Done" , cart})
    })