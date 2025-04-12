import express from "express"
import { protectRoutes } from "../auth/authController.js";
import { addCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from "./couponController.js";

const couponRouter = express.Router()

couponRouter.route("/")
.post(protectRoutes , addCoupon)
.get(getCoupons)

couponRouter.route("/:id")
.get(getCoupon)
.put(protectRoutes ,updateCoupon)
.delete(deleteCoupon)

export default couponRouter;