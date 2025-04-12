import Joi from "joi";


    export const addBrandSchema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        logo: Joi.object({
            fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().valid("image/jpeg" , "image/png" , "image/jpg").required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
            size: Joi.number().max(5242880).required(),
        }).unknown(true)
    })

