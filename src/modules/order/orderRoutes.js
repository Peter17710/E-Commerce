import express from "express"
import { protectRoutes } from "../auth/authController.js";
import { createOrder, deleteOrder, getAllOrders, getOrder, onlinePayment } from "./orderControllers.js";

const orderRouter = express.Router()

orderRouter.route("/:id")
.post(protectRoutes , createOrder)
.delete(protectRoutes , deleteOrder)

orderRouter.route("/checkout/:id")
.post(protectRoutes , onlinePayment)

orderRouter.route("/")
.get(protectRoutes , getAllOrders)
.get(protectRoutes , getOrder)


export default orderRouter;