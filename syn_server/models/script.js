const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const scriptSchema = new Schema({
    titre:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"public"
    },
    logline:{
        type:String,
        required:true
    },
    pitch:{
        type:String,
        required:true
    },
    genre:[{
        type:String,
        required:true
    }],
    format:{
        type:String,
        required:true
    },
    reader:[String],
    likes:[String],
    /* contribution:[contributionSchema] */
    
},{timestamps:true})


const Script = mongoose.model('script',scriptSchema)

module.exports = {Script,scriptSchema}

/* const contributionSchema =  new Schema({
    user:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    }
})
 */