import express from "express"
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from "./subCategoryController.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import { protectRoutes } from "../auth/authController.js";
import validate from "../../middleware/validation.js";
import { addSubCategorySchema } from "./subCategoryValidation.js";

const subCategoryRoutes = express.Router({mergeParams:true})

subCategoryRoutes.route("/")
.post(uploadSingle("image"), validate(addSubCategorySchema) , protectRoutes ,addSubCategory)
.get(getSubCategories)

subCategoryRoutes.route("/:id")
.get(getSubCategory)
.put(updateSubCategory)
.delete(deleteSubCategory)


export default subCategoryRoutes;