import express from "express"
import { protectRoutes } from "../auth/authController.js";
import { addCart, applyCoupon, getCart, removeCartItem, updateCart } from "./cartControllers.js";

const cartRouter = express.Router()

cartRouter.route("/")
.post(protectRoutes , addCart)
.get(protectRoutes , getCart)
.put(protectRoutes , updateCart)
    
cartRouter.route("/:id")
.delete(protectRoutes , removeCartItem)

cartRouter.route("/:code")
.patch(protectRoutes , applyCoupon)


export default cartRouter;