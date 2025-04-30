import { User } from "../../../db/models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { handleAsyncError } from "../../middleware/handleAsyncError.js"
import appError from "../../utils/appError.js"
    
   export const signUp = handleAsyncError( async(req,res,next)=>{
    let checkUser = await User.findOne({email: req.body.email})
    if (checkUser) return next(new appError("email already exist!" , 409))
    let user = new User (req.body)
    let added = await user.save()    
    res.status(201).json({message: "added" , added}) 
} )

    export const signIn = handleAsyncError(async(req,res,next)=>{
    let founded = await User.findOne({email: req.body.email})
    const match = bcrypt.compareSync(req.body.password , founded.password)

    if(founded && match){
        let token = jwt.sign({name:founded.name , userId:founded._id , role:founded.role} , "bl7")
      return  res.status(201).json({message: "Done!" , token})
    }
    next(new appError("invalid email or password" , 401))
    })


    //1-check we have token or not
    //2-verify token
    //3-if user of this token exist or not
    //4-check if this token is the last one or not (change password)

    export const protectRoutes = handleAsyncError(async(req,res,next)=>{
        let {token} = req.headers
        if(!token) return next(new appError("Please provide token" , 401))
        
        let decoded = await jwt.verify(token , "bl7")

        let user = await User.findById(decoded.userId)
        if(!user) return next(new appError("invalid user" , 404))

        if(user.changePasswordAt){
            let changePasswordTime = Math.round(user.changePasswordAt.getTime() / 1000);
            
            if(changePasswordTime>decoded.iat) return next(new appError("token invalid" , 401))
        }

        req.user = user    //bn5zn el data bta3t el user 34an hn7tagha
        next()
    })

    export const allowTo =(...roles) =>{

       return handleAsyncError(async(req,res,next)=>{
       if(!roles.includes(req.user.role)) return next(new appError("not authorized!" , 403))
        next()
            })
    }

