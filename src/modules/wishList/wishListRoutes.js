import express from "express"
import { protectRoutes } from "../auth/authController.js";
import { addToWishList, getAllWishLists, removeWishList } from "./wishListController.js";

const wishListRouter = express.Router()



wishListRouter.route("/")
.patch(protectRoutes ,addToWishList)
.delete(protectRoutes ,removeWishList)
.get(protectRoutes ,getAllWishLists)


export default wishListRouter;