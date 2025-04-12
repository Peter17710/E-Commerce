import authRouter from "./auth/authRoutes.js"
import brandRoutes from "./brand/brandRoutes.js"
import cartRouter from "./cart/cartRoutes.js"
import categoryRoutes from "./category/categoryRoutes.js"
import couponRouter from "./coupon/couponRoutes.js"
import orderRouter from "./order/orderRoutes.js"
import productRoutes from "./product/productRoutes.js"
import reviewRouter from "./review/reviewRoutes.js"
import subCategoryRoutes from "./subCategory/subCategoryRoutes.js"
import userRoutes from "./user/userRoutes.js"
import wishListRouter from "./wishList/wishListRoutes.js"


    export const bootstrap = (app) =>{
        app.use("/api/v1/categories" , categoryRoutes)
        app.use("/api/v1/subCategories" , subCategoryRoutes )
        app.use("/api/v1/brands" , brandRoutes)
        app.use("/api/v1/products" , productRoutes)
        app.use("/api/v1/users" , userRoutes)
        app.use("/api/v1/auth" , authRouter)
        app.use("/api/v1/review" , reviewRouter)
        app.use("/api/v1/wishList" , wishListRouter)
        app.use("/api/v1/coupon" , couponRouter)
        app.use("/api/v1/cart" , cartRouter)
        app.use("/api/v1/order" , orderRouter)
    }



    