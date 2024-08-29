import slugify from "slugify";
import { subCategory } from "../../../db/models/subCategory.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";

    export const addSubCategory = handleAsyncError(async(req,res,next)=>{
        req.body.slug = slugify(req.body.name)
        let subbCategory = new subCategory(req.body)
        console.log(subbCategory);
        let added = await subbCategory.save()
        console.log(added );    
        
        
         
        res.json({message: "added" , added}) 
    })

    export const getSubCategory = handleAsyncError(async(req,res,next)=>{
        
        const getSubCategory  = await subCategory.findById(req.params.id)

        res.json({message: "hello" , getSubCategory})
    })

    export const getSubCategories = handleAsyncError(async(req,res,next)=>{
        const getAllCategories = await subCategory.find()
        res.json({message: "hello" , getAllCategories})
    })

    export const updateSubCategory = handleAsyncError(async(req,res,next)=>{
        if(req.body.name)
            req.body.slug = slugify(req.body.name)

        const category = await subCategory.findByIdAndUpdate(req.params.id , req.body , {new:true})

 
        res.json({message: "hello",category})
    })

    export const deleteSubCategory = handleAsyncError(async(req,res,next)=>{
        const subCategoryy = await subCategory.findByIdAndDelete(req.params.id)

        subCategoryy ||  res.json({message: "not found"})
        !subCategoryy || res.json({message: "hello" , subCategoryy})
    })