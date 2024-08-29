import express from "express"
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from "./subCategoryController.js";

const subCategoryRoutes = express.Router()

subCategoryRoutes.route("/")
.post(addSubCategory)
.get(getSubCategories)
.get(getSubCategories)

subCategoryRoutes.route("/:id")
.get(getSubCategory)
.put(updateSubCategory)
.delete(deleteSubCategory)


export default subCategoryRoutes;