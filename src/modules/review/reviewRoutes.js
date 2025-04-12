import express from "express"
import { addReview, deleteReview, getReview, getReviews, updateReview } from "./reviewController.js";
import { protectRoutes } from "../auth/authController.js";

const reviewRouter = express.Router()

reviewRouter.route("/")
.post(protectRoutes , addReview)
.get(getReviews)


reviewRouter.route("/:id")
.get(getReview)
.put(protectRoutes ,updateReview)
.delete(deleteReview)


export default reviewRouter;