const express = require('express');
const dbConnect = require ('./config/connectDb')
const app = express();
require('dotenv').config()
const user = require('./models/user')
const port = process.env.PORT;

dbConnect()

//four routes : GET , POST , PUT, DELETE

app.post('/create' , (req,res)=>{

    user.insertMany([{
        name:"oumaima",
        email : "oumaima@gmail.com",
        age : 28
    },{
        name:"Samar",
        email : "samar@gmail.com",
        age : 25
    },{
        name:"Ahmed",
        email : "ahmed@gmail.com",
        age : 30
    }])
    .then(()=>{
        console.log('user added to database with success');
        res.status(200).json({msg:"user added"})
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg:"can not add new user"})
    })
//return all users route

app.get('/users',(req,res)=>{
    user.find({})
    .then((doc)=>{
        res.status(200).json({msg:"lost of users", doc})
    })
    .catch((err)=>{
        res.status(500).json ({msg:"can not get the list of users"})
    })
})


// update user selected with his ID
app.put('/users/:id',(req,res)=>{
    const {id} = req.params;
    const {name,email,age}=req.body;
    user.updateOne({_id : id},{$set:{name,email,age}},{new:true})
    .then((doc)=>{
        res.status(200).json({msg:"lost of users", doc})
    })
    .catch((err)=>{
        res.status(500).json ({msg:"can not get the list of users"})
    })
})
})

// delete a user selected with his ID

app.delete('/remove/:id',(req,res)=>{
    const {id} = req.params
    user.deleteOne({_id : id})
    .then(()=>{
        res.status(200).json({msg:"user removed with succes"})
    })
    .catch((err)=>{
        res.status(500).json({msg:"can not remove this user"})
    })
})


app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server run in : ${port}`)
})