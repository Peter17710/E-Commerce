import slugify from "slugify";
import { Category } from "../../../db/models/category.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";

    export const addCategory = handleAsyncError(async(req,res,next)=>{
        req.body.slug = slugify(req.body.name)
        let category = new  Category(req.body)
        console.log(category);
        let added = await category.save()
        console.log(added );
        
        
        res.json({message: "added" , added}) 
    })

    export const getCategory = handleAsyncError(async(req,res,next)=>{
        
        const category = await Category.findById(req.params.id)

        res.json({message: "hello" , category})
    })

    export const getCategories = handleAsyncError(async(req,res,next)=>{
        const getAllCategories = await Category.find()
        res.json({message: "hello" , getAllCategories})
    })

    export const updateCategory = handleAsyncError(async(req,res,next)=>{
        if(req.body.name)
            req.body.slug = slugify(req.body.name)

        const category = await Category.findByIdAndUpdate(req.params.id , req.body , {new:true})

 
        res.json({message: "hello",category})
    })

    export const deleteCategory = handleAsyncError(async(req,res,next)=>{
        const category = await Category.findByIdAndDelete(req.params.id)

        category ||  res.json({message: "not found"})
        !category || res.json({message: "hello" , category})
    })