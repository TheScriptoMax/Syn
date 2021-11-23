const mongoose = require('mongoose')
const {scriptSchema } = require('./script');

const Schema = mongoose.Schema;

const profilSchema = new Schema({
    _id: mongoose.ObjectId,
    username:{
        type:String,
        required:true,
        unique:true,
    },
    pp:{
        type:String,
        required:false,
    },
    followers:[mongoose.ObjectId],
    following:[mongoose.ObjectId],
    likes:[mongoose.ObjectId],
    scripts:[scriptSchema]

},{versionKey:false})

const Profil = mongoose.model('profil',profilSchema)

module.exports = { Profil }