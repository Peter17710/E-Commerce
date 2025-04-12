import slugify from "slugify";
import {subCategory } from "../../../db/models/subCategory.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import APIFeatures from "../../utils/APIFeatures.js";

    export const addSubCategory = handleAsyncError(async(req,res,next)=>{
        req.body.slug = slugify(req.body.name)
        req.body.image = req.file.filename
        let subbCategory = new subCategory(req.body)
        let added = await subbCategory.save()
        console.log(added );    
        
        res.json({message: "added" , added}) 
    })

    export const getSubCategory = handleAsyncError(async(req,res,next)=>{
        const getSubCategory  = await subCategory.findById(req.params.id)

        res.json({message: "Done!" , getSubCategory})
    })

    export const getSubCategories = handleAsyncError(async(req,res,next)=>{
        let filterObj = {}                    //merge params :)
        if(req.params.category){
            filterObj.category = req.params.category
        }
        
        let apiFeatures = new APIFeatures(subCategory.find() , req.query).pagination().sort().filter().fields()
        let results = await apiFeatures.mongooseQuery;
        res.json({message: "Done!" , results})
        
    })

    export const updateSubCategory = handleAsyncError(async(req,res,next)=>{
        if(req.body.name)
        req.body.slug = slugify(req.body.name)
        const category = await subCategory.findByIdAndUpdate(req.params.id , req.body , {new:true})

        res.json({message: "Done!",category})
    })

    export const deleteSubCategory = deleteOne(subCategory)
    