require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const axios=require('axios');
const category=require('../models/cards.js');

const contactDetails=require('../models/contactform.js');

const question=require('../models/questions.js');

const answer=require('../models/answer.js')

const signup=require('../models/signup.js');

const bodyparser=require('body-parser');

const bcrypt=require('bcryptjs');

const session=require('express-session');

router.use(session({secret:"choursiyasudhanshu2855",resave:false, saveUninitialized:true}));


router.get('/',async(req,res)=>{
let success=false;
let loggedin=false;

const categoriesNavtitle="Top categories";
const cardsData=await category.find();

    const categoriesNavdata=await category.find().limit(5);
    
if(req.session.username){
    success=true;
    loggedin=true;
}

    res.render('home.ejs',{cardsData:cardsData,categoriesNavdata:categoriesNavdata,categoriesNavtitle:categoriesNavtitle,success:success,loggedin:loggedin});
    
});


router.get('/home',async(req,res)=>{
let success=false;
let loggedin=false;

const categoriesNavtitle="Top categories";
    const cardsData=await category.find();

    
    const categoriesNavdata=await category.find().limit(5);

 if(req.session.username){
    success=true;
    loggedin=true;
}

    res.render('home.ejs',{cardsData:cardsData,categoriesNavdata:categoriesNavdata,categoriesNavtitle:categoriesNavtitle,success:success,loggedin:loggedin});
    
});



router.get('/about',async(req,res)=>{
let loggedin=false;
const categoriesNavtitle="Categories";
 const categoriesNavdata=await category.find();
    const cardsData=await category.find();
    
if(req.session.username){
    loggedin=true;
}

    res.render('about.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,loggedin:loggedin});
    
});

router.get('/contact',async(req,res)=>{
let loggedin=false;
 const categoriesNavtitle="Categories";
     const categoriesNavdata=await category.find();
    const cardsData=await category.find();
   
    const success=false;
    const error=false;

    if(req.session.username){
    loggedin=true;
    }

    res.render('contact.ejs',{cardsData:cardsData,success:success,error:error,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,loggedin:loggedin});
    
});

router.post('/contact',async(req,res)=>{
 const categoriesNavtitle="Categories";
    var success=false;
    var error=false;
    let loggedin=false;
    const categoriesNavdata=await category.find();
   
    const cardsData=await category.find();

    if(req.session.username){
    loggedin=true;
    }
    
    var contactData=new contactDetails({
        first_name:req.body.firstname,
        last_name:req.body.lastname,
        email:req.body.email,
        phone_no:req.body.phoneno,
        address:req.body.address,
        problam:req.body.problam
    })
    contactData.save().then(()=>{
    
        success=true;
        
        res.render('contact.ejs',{cardsData:cardsData,contactData:contactData,success:success,error:error,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,loggedin:loggedin});
       
        
    }).catch((err)=>{
    error=true;
    res.render('contact.ejs',{cardsData:cardsData,contactData:contactData,success:success,error:error,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,loggedin:loggedin});      
    })
    
});

router.get('/api/posts/questions',async(req,res)=>{
    const questionData=await question.find();
        
  res.json(questionData);       
    
})


router.get('/question',async(req,res)=>{
let success=false;
let error=false;
let nodata=false;
let loggedin=false;
let deleted=false;

const cateid=req.query.cateid;
const categoriesNavtitle="Categories";
const categoriesNavdata=await category.find();

    const cardsData=await category.find()   
    const cardsoneData=await category.findOne({cateid:cateid});
    const questionDetails=await question.find({thread_id:cateid});
   
    
if(req.session.username){
    loggedin=true;
    }

const username=req.session.username;

axios.get(process.env.API_QUESTION_URL)
.then((response)=>{
    const questionD=response.data;
    
     let questionData=questionD.filter(({thread_id})=>thread_id===cateid) 
    let dataCount=questionData.length;
  if(dataCount==0){
      nodata=true;
  }        
   
   res.render('questions.ejs',{cardsData:cardsData,cardsoneData:cardsoneData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,cateid:cateid,success:success,error:error,questionDetails:questionData,nodata:nodata,loggedin:loggedin,username:username,deleted:deleted});
   
    })
    
   
            
    
   
 });

router.post('/question',async(req,res)=>{
let success=false;
let error=false;
let nodata=false;
let loggedin=false;
let deleted=false;


const cateid=req.query.cateid;
const categoriesNavtitle="Categories";
const categoriesNavdata=await category.find();

    const cardsData=await category.find()
   
    const cardsoneData=await category.findOne({cateid:cateid});
    
 const questionDetails=await question.find({thread_id:cateid});

   if(req.session.username){
        loggedin=true;
        }
   
   const username=req.session.username;
   
    const questionData=new question({
      
      question_title:req.body.questiontitle, 
      question_description:req.body.questiondesc, 
      code_snippet:req.body.codesnippet, 
      thread_id:req.body.threadid,
      username:req.body.username 
        
    })
    
   await questionData.save().then(()=>{
        success=true;
                        
        axios.get(process.env.API_QUESTION_URL)
.then((response)=>{
    const questionD=response.data;
    
    let questionData=questionD.filter(({thread_id})=>thread_id===cateid)
    let dataCount=questionData.length;
    if(dataCount==0){
        nodata=true;
    }
    
    
    res.render('questions.ejs',{cardsData:cardsData,cardsoneData:cardsoneData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,cateid:cateid,success:success,error:error,questionDetails:questionData,nodata:nodata,loggedin:loggedin,username:username,deleted:deleted});
 })
       
}).catch((err)=>{
    error=true;
    
   axios.get(process.env.API_QUESTION_URL)
.then((response)=>{
    const questionD=response.data;
   
    let questionData=questionD.filter(({thread_id})=>thread_id===cateid)
    
    let dataCount=questionData.length;
    if(dataCount==0){
        nodata=true;
    }
    
    res.render('questions.ejs',{cardsData:cardsData,cardsoneData:cardsoneData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,cateid:cateid,success:success,error:error,questionDetails:questionData,nodata:nodata,loggedin:loggedin,username:username,deleted:deleted});
    
      })
    })

});
    
    router.get('/api/posts/answers',async(req,res)=>{
      const answerDetails=await answer.find()
      
     res.json(answerDetails);
    })
    
    router.get('/answer',async(req,res)=>{
let success=false;
let error=false;
let nodata=false;
let loggedin=false;
let deleted=false;

const commentid=req.query.commentid;
const cateid=req.query.cateid;

const categoriesNavtitle="Categories";
const categoriesNavdata=await category.find();

    const cardsData=await category.find()   
    const cardsoneData=await category.findOne({cateid:cateid});
    const questionDetails=await question.find({thread_id:cateid});
    
    const onequestionDetails=await question.findOne({_id:commentid});
    
    const answerDetails=await answer.find({comment_id:commentid})

   if(req.session.username){
    loggedin=true;
    }
    
    const username=req.session.username;
    
   axios.get(process.env.API_ANSWER_URL)
.then((response)=>{
    const answerData=response.data;
    
    let answerDetail=answerData.filter(({comment_id})=>comment_id===commentid);
    
    let dataCount=answerDetail.length;
  if(dataCount==0){
      nodata=true;
  }
  
    res.render('answer.ejs',{cardsData:cardsData,cardsoneData:cardsoneData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,cateid:cateid,success:success,error:error,questionDetails:questionDetails,onequestionDetails:onequestionDetails,commentid:commentid,answerDetails:answerDetail,nodata:nodata,loggedin:loggedin,username:username,deleted:deleted});
        
  })
}) 
    
   
    router.post('/answer',async(req,res)=>{
let success=false;
let error=false;
let nodata=false;
let loggedin=false;
let deleted=false;

const commentid=req.query.commentid;
const cateid=req.query.cateid;

const categoriesNavtitle="Categories";
const categoriesNavdata=await category.find();

    const cardsData=await category.find()   
    const cardsoneData=await category.findOne({cateid:cateid});
    const questionDetails=await question.find({thread_id:cateid});
    
    const onequestionDetails=await question.findOne({_id:commentid});
    
    const answerDetails=await answer.find({comment_id:commentid})

    if(req.session.username){
    loggedin=true;
    }
    const username=req.session.username;
    
    const answerData=new answer({
        answer:req.body.answer, 
        comment_id:commentid,
        username:req.body.username
    })
    
    answerData.save().then(()=>{
    
    success=true;
    
   axios.get(process.env.API_ANSWER_URL)
.then((response)=>{
    const answerDatas=response.data;
    
        let answerDetail=answerDatas.filter(({comment_id})=>comment_id===commentid);
        
         let dataCount=answerDetail.length;
  if(dataCount==0){
      nodata=true;
  }
  
        res.render('answer.ejs',{cardsData:cardsData,cardsoneData:cardsoneData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,cateid:cateid,success:success,error:error,questionDetails:questionDetails,onequestionDetails:onequestionDetails,commentid:commentid,answerDetails:answerDetail,nodata:nodata,loggedin:loggedin,username:username,deleted:deleted});
        
    })
               
        
}).catch((err)=>{
    error=true;
        
axios.get(process.env.API_ANSWER_URL)
.then((response)=>{
    const answerDatas=response.data;
    
    let answerDetail=answerDatas.filter(({comment_id})=>comment_id=commentid);
    
     let dataCount=answerDetail.length;
  if(dataCount==0){
      nodata=true;
  }
    
    res.render('answer.ejs',{cardsData:cardsData,cardsoneData:cardsoneData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,cateid:cateid,success:success,error:error,questionDetails:questionDetails,onequestionDetails:onequestionDetails,commentid:commentid,answerDetails:answerDetail,nodata:nodata,loggedin:loggedin,username:username,deleted:deleted});
  })
              
 })
    
});

router.get('/signup',async(req,res)=>{

let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;

const categoriesNavtitle="Categories";
 const categoriesNavdata=await category.find();
    const cardsData=await category.find();
    
    if(req.session.username){
    loggedin=true;
    res.redirect('/');
    }else{
    res.render('signup.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin});
         }
    
});

router.post('/signup',async(req,res)=>{

let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;

const categoriesNavtitle="Categories";
 const categoriesNavdata=await category.find();
    const cardsData=await category.find();
    
    if(req.session.username){
    loggedin=true;
    }
    
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    
    
    
    
    if(password==cpassword){
    const hashpassword=await bcrypt.hash(password,10);
    
    const signupData=new signup({
        username:username,
        email:email,
        password:hashpassword
        
    })
       signupData.save().then(()=>{
           console.log("success");
           success=true;
           res.render('signup.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin});
           
       }).catch((err)=>{
           console.log(err);
           error=true
           res.render('signup.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin});
           
       })
    }
    else{
        passnotmatch=true;
        
        res.render('signup.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin});
    };
    
    
});


router.get('/login',async(req,res)=>{

let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;

const categoriesNavtitle="Categories";
 const categoriesNavdata=await category.find();
    const cardsData=await category.find();
    
if(req.session.username){
    loggedin=true;
    res.redirect('/')
}else{
    res.render('login.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin});
    }
    
    
});

router.post('/login',async(req,res)=>{

let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;

const categoriesNavtitle="Categories";
 const categoriesNavdata=await category.find();
    const cardsData=await category.find();
    
    if(req.session.username){
    loggedin=true;
    }
    
    const username=req.body.username;
    const userpassword=req.body.password;
    
    
  const userMatch=await signup.findOne({username:username});
  
  if(userMatch){
      const passMatch=await bcrypt.compare(userpassword,userMatch.password);
      if(passMatch){
      req.session.username=username;
      res.redirect('/home');
      
      }
      else{
      passnotmatch=true;
      res.render('login.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin});        
      }
  }else{
      error=true;
      res.render('login.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin});
        
  }
          
});

router.get('/logout',(req,res)=>{
let loggedin=false;
    if(req.session.username){
    loggedin=true;
    req.session.destroy();
    res.redirect('/login');
    }else{
        res.redirect('/login');
    }
    
});


router.post('/search',async(req,res)=>{
let nodata=false;
let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;

const categoriesNavtitle="Categories";
 const categoriesNavdata=await category.find();
    const cardsData=await category.find();
    
    if(req.session.username){
    loggedin=true;
    }
    
    const searched=req.body.search;
    
   const findSearch=await question.find({
       
       $or:[
       
       {question_title:{$regex:".*"+searched+".*",$options:'i'}}, 
       {question_description:{$regex:".*"+searched+".*",$options:'i'}}
       
         ]
       
   })
   
  
   if(findSearch.length==0){
   
       nodata=true;
   }
   
      
   res.render('search.ejs',{cardsData:cardsData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin,searched:searched,findSearch:findSearch,nodata:nodata});    
    
});


router.post('/delete-question',async(req,res)=>{
let success=false;
let error=false;
let nodata=false;
let loggedin=false;
let deleted=false;


const cateid=req.query.cateid;
const categoriesNavtitle="Categories";
const categoriesNavdata=await category.find();

    const cardsData=await category.find()
   
    const cardsoneData=await category.findOne({cateid:cateid});
    
 const questionDetails=await question.find({thread_id:cateid});

   if(req.session.username){
        loggedin=true;
        }
   
   const username=req.session.username;
   
  const id=req.body.boxid;
  try{
      const deleteQuestion=await question.deleteOne({_id:id})
      deleted=true;
    
  } catch(err) {
  console.log(err);
      
  }
    
    
   axios.get(process.env.API_QUESTION_URL)
.then((response)=>{
    const questionD=response.data;
    
    let questionData=questionD.filter(({thread_id})=>thread_id===cateid)
    let dataCount=questionData.length;
    if(dataCount==0){
        nodata=true;
    }
    
    
    res.render('questions.ejs',{cardsData:cardsData,cardsoneData:cardsoneData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,cateid:cateid,success:success,error:error,questionDetails:questionData,nodata:nodata,loggedin:loggedin,username:username,deleted:deleted});
        
 }) 

});


router.post('/delete-answer',async(req,res)=>{
let success=false;
let error=false;
let nodata=false;
let loggedin=false;
let deleted=false;

const commentid=req.query.commentid;
const cateid=req.query.cateid;

const categoriesNavtitle="Categories";
const categoriesNavdata=await category.find();

    const cardsData=await category.find()   
    const cardsoneData=await category.findOne({cateid:cateid});
    const questionDetails=await question.find({thread_id:cateid});
    
    const onequestionDetails=await question.findOne({_id:commentid});
    
    const answerDetails=await answer.find({comment_id:commentid})

    if(req.session.username){
    loggedin=true;
    }
    const username=req.session.username;
    
    const id=req.body.boxid;
    
    try{
    const deleteAnswer=await answer.deleteOne({_id:id})
      deleted=true;
      
      } catch(err) {
       console.log(err)
    }
    
         axios.get(process.env.API_ANSWER_URL)
.then((response)=>{
    const answerDatas=response.data;
    
        let answerDetail=answerDatas.filter(({comment_id})=>comment_id===commentid);
        
         let dataCount=answerDetail.length;
  if(dataCount==0){
      nodata=true;
  }
  
        res.render('answer.ejs',{cardsData:cardsData,cardsoneData:cardsoneData,categoriesNavtitle:categoriesNavtitle,categoriesNavdata:categoriesNavdata,cateid:cateid,success:success,error:error,questionDetails:questionDetails,onequestionDetails:onequestionDetails,commentid:commentid,answerDetails:answerDetail,nodata:nodata,loggedin:loggedin,username:username,deleted:deleted})
        
 })
               
});            
        
     router.get('*',(req,res)=>{
         
         res.render('notfoundpage.ejs');
         
     })  
        
module.exports=router;
