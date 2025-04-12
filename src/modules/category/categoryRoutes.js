import express from "express"
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./categoryController.js";
import subCategoryRoutes from "../subCategory/subCategoryRoutes.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import validate from "../../middleware/validation.js";
import { addCategorySchema } from "./categoryValidation.js";
import { protectRoutes } from "../auth/authController.js";

const categoryRoutes = express.Router()

categoryRoutes.use("/:category/subCategory" , subCategoryRoutes)

categoryRoutes.route("/")
.post(uploadSingle("image"), validate(addCategorySchema), protectRoutes ,  addCategory)
.get(getCategories)


categoryRoutes.route("/:id")
.get(getCategory)
.put(updateCategory)
.delete(deleteCategory)


export default categoryRoutes;