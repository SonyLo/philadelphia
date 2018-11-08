const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  orderSchema = new Schema({
    date:{
        type: Date,
        default: Date.now
    },
    list :[
        {}
    ],
    idUser:{
       type:String,
       required: true 
    },
    userName:{
        type: String
    },
    phone:{
        type: String
    }
   
})

module.exports = mongoose.model('orders', orderSchema)