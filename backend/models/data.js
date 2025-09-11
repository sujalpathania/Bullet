const mongoose=require("mongoose");

const dataSchema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    
        email:{
            type:String,
            require: true,
            unique:true,
        },
        message:{
            type:String,
            require:true,
        },
}) 
module.exports=mongoose.model('data',dataSchema)



