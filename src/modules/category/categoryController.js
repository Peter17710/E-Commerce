import slugify from "slugify";
import { Category } from "../../../db/models/category.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import APIFeatures from "../../utils/APIFeatures.js";

    export const addCategory = handleAsyncError(async(req,res,next)=>{
        req.body.slug = slugify(req.body.name)
        req.body.image = req.file.filename
        let category = new  Category(req.body)
        console.log(category);
        let added = await category.save()
        console.log(added );
        
         
        res.status(402).json({message: "added" , added}) 
    })

    export const getCategory = handleAsyncError(async(req,res,next)=>{
        
        const category = await Category.findById(req.params.id)

        res.json({message: "Done!" , category})
    })

    export const getCategories = handleAsyncError(async(req,res,next)=>{
        let apiFeatures = new APIFeatures(Category.find() , req.query).pagination().sort().filter().fields()
        let results = await apiFeatures.mongooseQuery;
        res.json({message: "Done!" , results})
    })

    export const updateCategory = handleAsyncError(async(req,res,next)=>{
        if(req.body.name)
            req.body.slug = slugify(req.body.name)

        const category = await Category.findByIdAndUpdate(req.params.id , req.body , {new:true})

 
        res.json({message: "Done!",category})
    })

    export const deleteCategory =  deleteOne(Category)
    