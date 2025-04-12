import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import { Review } from "../../../db/models/review.model.js";
import appError from "../../utils/appError.js";
import APIFeatures from "../../utils/APIFeatures.js";

    export const addReview = handleAsyncError( async(req,res,next)=>{

        req.body.userId = req.user._id     //(protected routes)
        let isReview = await Review.findOne({userId: req.user._id , productId:req.body.productId})
        if(isReview) return next(new appError("already have review", 409))

        let review = new Review (req.body)
        let added = await review.save()

        res.json({message: "added" , added}) 
    } )

    export const getReview =handleAsyncError( async(req,res,next)=>{
        
        const review  = await Review.findOne({_id:req.params.id})

        res.json({message: "Done!" , review})
    })

    export const getReviews = handleAsyncError( async(req,res,next)=>{
       
        let apiFeatures = new APIFeatures(Review.find() , req.query).pagination().sort().filter().fields()
        let results = await apiFeatures.mongooseQuery;
        res.json({message: "Done!" , page: apiFeatures.page , results})
    })
    export const updateReview = handleAsyncError(async(req,res,next)=>{
        req.body.userId = req.user._id     //(protected routes)
        const {id} = req.params
        const review = await Review.findOneAndUpdate({_id:id , userId:req.user._id}, req.body , {new:true})

        res.json({message: "Done!",review})
    })

    export const deleteReview = deleteOne(Review)