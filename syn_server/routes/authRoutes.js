const express = require('express');
const router = express.Router();
const {userValidationRules, validate ,generateAccesToken,authenticateToken,generateRefreshToken,authenticateRefreshToken} = require('../controllers/authController')
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken");
const { User } = require('../models/user');
const { Profil} = require('../models/profil');
const {sendEmailConfirm} = require('../middleware/emailConfirm');
const mongoose = require('mongoose');
require('dotenv').config();



router.post('/signup',userValidationRules(),validate, async(req,res)=>{
    const { username, email, password } = req.body;
    const user = await User.findOne({$or:[{username:username},{email:email}]})
    
    if (user) {
        return res.status(400).json({
            "error":[
                {
                    "msg":"Cet-te utilisat-eur-rice existe déjà."
                }
            ]
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({
        username,
        email,
        password:hashedPassword,
        confirmed:false
    })
    try {
        
        await newUser.save().then((doc)=>{
            const id = doc._id.valueOf()
            const email = doc.email
            const username = doc.username
            sendEmailConfirm(id,username,email)
            res.status(201).json({msg:"User created",isPending:true})
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:error});
        return
    }
    
})


router.get('/confirmation/:token',async(req,res)=>{
    try {
        const {token} = req.params
        JWT.verify(token,process.env.EMAIL_SECRET,async(err,user)=>{
            if(err){
                console.log(err)
                return res.sendStatus(401);
            }
            await User.findOneAndUpdate({_id:user.userId},{confirmed:true})
            const newProfil = new Profil({
                _id: new mongoose.mongo.ObjectId(user.userId),
                username:user.username,
                pp:"",
                followers:[],
                following:[],
                likes:[],
                scripts:[]
            })
            await newProfil.save()
        });
    } catch (error) {
        res.send({message:error})
    }
    return res.redirect('http://localhost:3000/')
})

router.post('/signin', async (req,res)=>{
    const {login,password}=req.body;


    const user = await User.findOne({$or:[{username:login},{email:login}]})

    if (!user && !user.confirmed){
        return res.status(400).json({
            "error":[
                {
                    "msg":"L'identifiant ou le mot de passe sont invalide."
                }
            ]
        })
    }
    let isMatch = await bcrypt.compare(password,user.password)

    if (!isMatch){
        return res.status(400).json({
            "error":[
                {
                    "msg":"L'identifiant ou le mot de passe sont invalide."
                }
            ]
        })
    }

    const accessToken = generateAccesToken(user.username,user._id)
    const refreshToken = generateRefreshToken(user.username,user._id)

    res.status(200).cookie('accesToken',accessToken,{
        maxAge:900000,
        secure:true,
        httpOnly:true,
        sameSite:'strict',
    }).send({auth:true})
   
});






module.exports = router