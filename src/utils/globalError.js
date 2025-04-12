

    // export const globalError = (err,req,res,next)=>{
    //     res.status(err.statusCode).send(err.message);
    // }

    // filepath: c:\Users\Peter\Desktop\E-Commerce\src\utils\globalError.js
export const globalError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if undefined
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
    });
};

