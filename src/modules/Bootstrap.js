import brandRoutes from "./brand/brandRoutes.js"
import categoryRoutes from "./category/categoryRoutes.js"
import subCategoryRoutes from "./subCategory/subCategoryRoutes.js"


    export const bootstrap = (app) =>{
        app.use("/api/v1/categories" , categoryRoutes)
        app.use("/api/v1/subCategories" , subCategoryRoutes )
        app.use("/api/v1/brands" , brandRoutes)
    }



    