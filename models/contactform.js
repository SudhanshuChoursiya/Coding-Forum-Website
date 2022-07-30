const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    
    first_name:{
        type:String,
        required:true  
    },
    last_name:{
        type:String,
        required:true  
    },
    email:{
        type:String,
        required:true  
    },
     phone_no:{
        type:String,
        required:true  
    },
     address:{
        type:String,
        required:true  
    },
    problam:{
        type:String,
        required:true  
    }
    
});

module.exports=mongoose.model('contactdetail',contactSchema);