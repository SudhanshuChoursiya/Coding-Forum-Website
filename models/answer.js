const mongoose=require('mongoose');

const answerSchema=new mongoose.Schema({
    
    answer:{
        type:String, 
        required:true
    }, 
    comment_id:{
        type:String   
    },
    username:{
        type:String   
    }
    
})

module.exports=mongoose.model('answer',answerSchema);
