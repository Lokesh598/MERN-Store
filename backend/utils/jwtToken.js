//creting token and save in cookie

const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();
    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24*60*60*1000
        ),
        httpOnly: true,
    };

    // if (process.env.NODE_ENV === 'production') {
    //     options.secure = true;
    // }

    res.status(statusCode).cookie('jwt', token, options).json({
        status: true,
        user,
        token,
    });
};

module.exports = sendToken;