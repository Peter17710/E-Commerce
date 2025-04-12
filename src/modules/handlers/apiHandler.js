import { handleAsyncError } from "../../middleware/handleAsyncError.js"


   export const deleteOne = (model) => {
    return  handleAsyncError(async(req,res,next)=>{
        const item = await model.findByIdAndDelete(req.params.id)

        item ||  res.json({message: "Not found"})
        !item || res.json({message: "Deleted!" , item})
    })
   } 