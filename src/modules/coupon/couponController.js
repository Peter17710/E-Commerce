import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import APIFeatures from "../../utils/APIFeatures.js";
import { Coupon } from "../../../db/models/coupon.model.js";
import QRCode from 'qrcode'

    export const addCoupon = handleAsyncError( async(req,res,next)=>{
        let coupon = new Coupon (req.body)
        let added = await coupon.save()
        res.json({message: "added" , added}) 
    } )

    export const getCoupon =handleAsyncError( async(req,res,next)=>{
        const {id} = req.params
        const coupon  = await Coupon.findOne({_id:id})
        let url = await QRCode.toDataURL(coupon.code)
        !coupon && next(new appError("coupon not found" , 404))
        coupon && res.json({message: "Done!" , coupon , url})
    })

    export const getCoupons = handleAsyncError( async(req,res,next)=>{
       
        let apiFeatures = new APIFeatures(Coupon.find() , req.query).pagination().sort().filter().fields()
        let results = await apiFeatures.mongooseQuery;
        res.json({message: "Done!" , page: apiFeatures.page , results})
    })

    export const updateCoupon = handleAsyncError(async(req,res,next)=>{
        const {id} = req.params
        const coupon = await Coupon.findOneAndUpdate({_id:id }, req.body , {new:true})

        res.json({message: "Done!",coupon})
    })

    export const deleteCoupon = deleteOne(Coupon)