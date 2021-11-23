const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// JOI VALIDATION

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmed:{
        type:Boolean,
        required:true,
        unique:true
    }
},{versionKey: false,timestamps:true})

const User = mongoose.model('user',userSchema)

module.exports = { User }