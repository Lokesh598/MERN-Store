// const { url } = require('inspector');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },  
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        price_length: [8, 'Product price can not exceed 8 characters']
    },
    rating: {
        type: Number,   
        default: 0
    },
    imgages:[
        {
            public_id: {
                type: String,
                required: [true, 'Product image is required']
            },
            url:{
                type: String,
                required: [true, 'Product image url is required']
            }
        }
    ],
    category: {
        type:String,
        required: [true, 'Product category is required']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        maxLength:[4, 'Product stock can not exceed 4 characters'],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: [true, 'Review name is required']
            },
            ratting: {
                type: Number,
                required: [true, 'Review ratting is required'],
            },
            comment: {
                type: String,
                required: [true, 'Review comment is required']
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Product', productSchema);