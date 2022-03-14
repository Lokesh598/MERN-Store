const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next) => {
    
    const {jwt} = req.cookies;// cookie name is jwt
    // console.log(token);
    if(!jwt) {
        return next(new ErrorHandler("Please login to access this resource",401));
    }
    const decodedData = Jwt.verify(jwt,process.env.JWT_SECRET);
    
    req.user = await User.findById(decodedData.id);

    next();// callback function
});