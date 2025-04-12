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
        // //1-Pagination
        // let page = req.query.page*1 || 1  //el || 1 34an lw md5lna4 page fl params w *1 34an tb2a number msh string
        // if(req.query.page <= 0) page= 1
        // let skip = (page-1)*4

        // //2-filteration
        // let filterObj = {...req.query}
        // let excludedQuery = ["page" , "sort" , "keyword" , "fields"]
        // excludedQuery.forEach((e) =>{
        //     delete filterObj[e]
        // })
        // // plus the $ to gte at query 
        // filterObj = JSON.stringify(filterObj)
        // filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g,match => `$${match}`)
        // filterObj = JSON.parse(filterObj)
        // //3-sort  
        // //build query
        // const mongooseQuery =  Product.find(filterObj).skip(skip).limit(4)
        // if(req.query.sort){
        // let sortBy = req.query.sort.split(",").join(" ") //["-price","sold"] => -price sold
        // mongooseQuery.sort(sortBy)
        // }
        // //4-search
        // if(req.query.keyword){
        //     mongooseQuery.find({$or:[{name: {$regex:req.query.keyword,$options:"i"}} , {description: {$regex:req.query.keyword,$options:"i"}}]})
        //     }
        // //5-fields
        // if(req.query.fields){
        // let field = req.query.fields.split(",").join(" ") //["-price","sold"] => -price sold
        // mongooseQuery.select(field)
        // }

        //excute query
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
    