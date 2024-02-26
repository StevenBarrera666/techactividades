const mongoose = require('mongoose')

const HouseSchema = new mongoose.Schema({
    address:{
        type:String,
        require: true,
        unique: true
    } ,
    city:{
        type: String,
        require: true
     },

    state: {
        type: String,
        require: true
    },

    size:{
        type: Number,
        require: true
    },
    type:{
        type: String,
        require: true
    },
    zip_code:{
        type: Number,
        require: true
    },
    rooms:{
        type: Number,
        require: true
    },
    bathrooms: {
        type: Number,
        require: true
    },
    parking: {
        type: Boolean,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    code:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    }
    
})

module.exports = mongoose.model('user',HouseSchema)