import slugify from "slugify";
import { brand } from "../../../db/models/brand.model.js";
import { handleAsyncError } from "../../middleware/handleAsyncError.js";

    export const addBrand = handleAsyncError( async(req,res,next)=>{
        req.body.slug = slugify(req.body.name)
        let brands = new brand (req.body)
        console.log(brands);
        let added = await brands.save()
        console.log(added );    
    
         
         
        res.json({message: "added" , added}) 
    } )

    export const getBrand =handleAsyncError( async(req,res,next)=>{
        
        const getBrand  = await brand.findById(req.params.id)

        res.json({message: "hello" , getBrand})
    })

    export const getBrands = handleAsyncError( async(req,res,next)=>{
        const getBrands = await brand.find()
        res.json({message: "hello" , getBrands})
    })
    export const updateBrand = handleAsyncError(async(req,res,next)=>{
        if(req.body.name)
            req.body.slug = slugify(req.body.name)

        const brands = await brand.findByIdAndUpdate(req.params.id , req.body , {new:true})

 
        res.json({message: "hello",brands})
    })

    export const deleteBrand = handleAsyncError(async(req,res,next)=>{
        const brands = await brand.findByIdAndDelete(req.params.id)

        brands ||  res.json({message: "not found"})
        !brands || res.json({message: "hello" , brands})
    })