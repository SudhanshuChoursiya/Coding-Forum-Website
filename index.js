require('dotenv').config();

const express=require('express');

const port=process.env.PORT||3000;

const app=express();

const path=require('path');

const routes=require('./routes/routes.js');

const mongoose=require('mongoose');

const bodyparser=require('body-parser');
const cors=require('cors');

const favicon =require('serve-favicon');

app.set('view-engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(cors());
app.use(express.static('public'));

app.use(favicon(__dirname+'/favicon.png'));

mongoose.connect(process.env.MONGO_CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("not connected to db");
})


app.use(bodyparser.urlencoded({extended:false}));

app.use(bodyparser.json());

app.use('',routes);


app.listen(port,()=>{console.log("server is running...")});
