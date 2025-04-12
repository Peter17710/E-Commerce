import express from "express"
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./brandController.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import { protectRoutes } from "../auth/authController.js";
import { addBrandSchema } from "./brandValidation.js";
import validate from "../../middleware/validation.js";

const brandRoutes = express.Router()

brandRoutes.route("/")
.post(uploadSingle("logo"), validate(addBrandSchema) , protectRoutes  , addBrand)
.get(getBrands)


brandRoutes.route("/:id")
.get(getBrand)
.put(updateBrand)
.delete(deleteBrand)


export default brandRoutes;