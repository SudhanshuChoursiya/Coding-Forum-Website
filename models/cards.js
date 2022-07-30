const mongoose=require('mongoose');

const cardsSchema=new mongoose.Schema({

    category_title:String,
    category_description:String,
    category_image:String,
    cateid:String,
    thread_image:String
    
});

module.exports=mongoose.model('category',cardsSchema);
