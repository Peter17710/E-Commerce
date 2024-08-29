import express from "express"
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./categoryController.js";

const categoryRoutes = express.Router()

categoryRoutes.route("/")
.post(addCategory)
.get(getCategories)


categoryRoutes.route("/:id")
.get(getCategory)
.put(updateCategory)
.delete(deleteCategory)


export default categoryRoutes;