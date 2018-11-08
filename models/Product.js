const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  productSchema = new Schema({
    date:{
        type: Date,
        default: Date.now
    },
    name:{
        type:String
        },
    cost:{
        type: Number
        },
        
    description:{
            type:String
        },
    imageSrc:{
        type: String,
        default:''
        },
    
})
    

module.exports = mongoose.model('products', productSchema)