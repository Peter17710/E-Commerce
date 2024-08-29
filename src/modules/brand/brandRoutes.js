import express from "express"
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./brandController.js";

const brandRoutes = express.Router()

brandRoutes.route("/")
.post(addBrand)
.get(getBrands)


brandRoutes.route("/:id")
.get(getBrand)
.put(updateBrand)
.delete(deleteBrand)


export default brandRoutes;