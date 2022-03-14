const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

//Register user

exports.registerUser = catchAsyncErrors(async (req,res,next) => {

    const { name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: 'this is sample id',
            url: 'profilepicurl'
        }
    });
    
    // const token = user.getJWTToken();
    // res.status(201).json({
    //     status: true,
    //     token,
    // });
    sendToken(user,201,res);
});

//Login user

exports.loginUser = catchAsyncErrors(async (req,res,next) => {
    const { email, password} = req.body;

    //checking if user has given email and password both

    if(!email || !password){
        return next(new ErrorHandler('Please provide email and password',400));
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler('Incorrect email or password',401));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler('Incorrect email or password',401));
    }

    // const token = user.getJWTToken();
    // res.status(200).json({
    //     status: true,
    //     token,
    // });
    sendToken(user,200,res);

});

// Logout user

exports.logoutUser = catchAsyncErrors(async (req,res,next) => {
    res.cookie('jwt', null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        status: true,
        message: 'Logout successfully'
    });
});