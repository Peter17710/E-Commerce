import { handleAsyncError } from "../../middleware/handleAsyncError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import { User } from "../../../db/models/user.model.js";
import appError from "../../utils/appError.js";

    export const addUser = handleAsyncError( async(req,res,next)=>{
        let checkUser = await User.findOne({email: req.body.email})
        if (checkUser) return next(new appError("already register" , 409))
        let user = new User (req.body)
        let added = await user.save()    
        res.json({message: "added" , added}) 
    } )

    export const getUser =handleAsyncError( async(req,res,next)=>{
        
        const getUser  = await User.findById(req.params.id)

        res.json({message: "Done!" , getUser})
    })

    export const getUsers = handleAsyncError( async(req,res,next)=>{
        const getuser = await User.find()
        res.json({message: "Done!" , getuser})
    })
    export const updateUser = handleAsyncError(async(req,res,next)=>{
        const user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true})
        !user && next(new appError("user not found" , 404))
         user && res.json({message: "Done!" , user})
 
    })

    export const changePasssword = handleAsyncError(async(req,res,next)=>{
        
        req.body.changePasswordAt =  Date.now() ; 
        
        const user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true})
        !user && next(new appError("user not found" , 404))
         user && res.json({message: "Done!" , user})
 
    })

    export const deleteUser = deleteOne(User)