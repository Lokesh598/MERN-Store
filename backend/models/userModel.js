const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter your name'],
        maxLenght: [30,'Name cannot be more than 50 characters'],
        minlength: [4,'Name cannot be less than 3 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true,'Please enter your email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true,'Please enter your password'],
        minlength: [8,'Password cannot be less than 8 characters'],
        trim: true,
        select: false,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    // age: {
    //     type: Number,
    //     default: 0,
    //     validate(value) {
    //         if (value < 0) {
    //             throw new Error('Age must be a positive number');
    //         }
    //     }
    // },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],
    avatar: {
        // type: Buffer
        public_id: {
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        // enum: ['user','admin'],
        default: 'user'
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// bcrypt
userSchema.pre("save", async function(next) {
   
    if(!this.isModified('password')){ 
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// jwt token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// compare password

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
module.exports =  mongoose.model('User', userSchema);