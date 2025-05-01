import slugify from "slugify";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { Product } from "../../../db/models/product.model.js";
import { deleteOne } from "../handlers/apiHandler.js";
import APIFeatures from "../../utils/APIFeatures.js";

    export const addProduct = handleAsyncError( async(req,res,next)=>{
        req.body.slug = slugify(req.body.name)
        req.body.imageCover = req.files.imageCover[0].filename
        req.body.images = req.files.images.map(ele => ele.filename)
        let products = new Product (req.body)
        console.log(products);
        let added = await products.save()
        res.json({message: "added" , added}) 
    } )

    export const getProductById =handleAsyncError( async(req,res,next)=>{
        
        const getProduct  = await Product.findById(req.params.id)
        res.json({message: "Done!" , getProduct})
    })

    export const getAllProducts = handleAsyncError( async(req,res,next)=>{
     
        let apiFeatures = new APIFeatures(Product.find() , req.query).pagination().sort().filter().fields()
        let results = await apiFeatures.mongooseQuery;
        res.json({message: "Done!" , page: apiFeatures.page , results})
    })
            

    export const updateProduct = handleAsyncError(async(req,res,next)=>{
        if(req.body.name)
            req.body.slug = slugify(req.body.name)

        const products = await Product.findByIdAndUpdate(req.params.id , req.body , {new:true})
        res.json({message: "Done!",products})
    })

    export const deleteProduct = deleteOne(Product)
    
