import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { User } from "../../../db/models/user.model.js";
import appError from "../../utils/appError.js";



    export const addToWishList = handleAsyncError(async(req,res,next)=>{
        const {product} = req.body      
        const results = await User.findOneAndUpdate(
         {_id:req.user.id},
        {
            $addToSet: {wishList: product},
        },
         {new:true}
        );
        !results && next(new appError("not found wishList" , 404))
        results && res.json({message: "Done!",results})
    })


    export const removeWishList = handleAsyncError(async(req,res,next)=>{
        const {product} = req.body      
        const results = await User.findOneAndUpdate(
         req.user.id,
        {
            $pull: {wishList: product},
        },
         {new:true}
        );
        !results && next(new appError("not found wishList" , 404))
        results && res.json({message: "Done!",results})
    })


    export const getAllWishLists = handleAsyncError(async(req,res,next)=>{
        const results = await User.findOne({_id:req.user.id})
        !results && next(new appError("not found wishList" , 404))
        results && res.json({message: "Done!",results: results.wishList})
        
    })

