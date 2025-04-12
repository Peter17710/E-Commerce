import express from "express"
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./productController.js";
import validate from "../../middleware/validation.js";
import { addProductSchema, productIdSchema, updateProductSchema } from "./productValidation.js";
import { allowTo, protectRoutes } from "../auth/authController.js";
import { uploadFields } from "../../utils/fileUpload.js";

const productRoutes = express.Router()

productRoutes.route("/")
.post(uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),validate(addProductSchema) , protectRoutes , allowTo("admin","user") ,addProduct)
.get(getAllProducts)


productRoutes.route("/:id")
.get(validate(productIdSchema),getProductById)
.put(uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),validate(updateProductSchema),updateProduct)
.delete(validate(productIdSchema),deleteProduct)


export default productRoutes;