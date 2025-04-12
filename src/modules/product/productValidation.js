import Joi from "joi";


const addProductSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().trim(),
    description: Joi.string().min(3).max(300).required().trim(),
    price: Joi.number().min(0).required(),
    priceAfterDiscount: Joi.number().min(0).required(),
    quantity: Joi.number().min(0).required(),
    category: Joi.string().hex().required(),
    subCategory: Joi.string().hex().required(),
    brand: Joi.string().required(),
    createdBy: Joi.string().hex().optional(),
    imageCover: Joi.array().items(Joi.object({
                fieldname: Joi.string().required(),
                originalname: Joi.string().required(),
                encoding: Joi.string().required(),
                mimetype: Joi.string().valid("image/jpeg" , "image/png" , "image/jpg").required,
                destination: Joi.string().required(),
                filename: Joi.string().required(),
                path: Joi.string().required(),
                size: Joi.number().max(5242880).required(),
            }).unknown(true)),
    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/jpeg" , "image/png" , "image/jpg").required,
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required(),
    }).unknown(true)),
})

const productIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(30).trim(),
    description: Joi.string().min(3).max(30).trim()
})

export {
    addProductSchema ,
    productIdSchema ,
    updateProductSchema
}
