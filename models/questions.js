const mongoose=require('mongoose');

const questionSchema=new mongoose. Schema({
    question_title:{
        type:String, 
        required:true
    }, 
    question_description:{
        type:String, 
        required:true
    }, 
    code_snippet:{
        type:String, 
        required:true
    }, 
    thread_id:{
       type:String
    },
    username:{
       type:String
    }
    
    
});

module.exports=mongoose.model('question',questionSchema);

