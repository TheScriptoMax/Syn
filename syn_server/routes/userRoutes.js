const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Profil } = require('../models/profil');
const {Script} = require('../models/script')
const {authenticateToken} = require('../controllers/authController');
const mongoose = require('mongoose');


router.get('/',authenticateToken,async(req,res)=>{
    const {isAuth} = req.isLogged
    
    res.send('is Logged')
})

router.get('/scripts',authenticateToken,async(req,res)=>{
    try {
        await Profil.findById(req.isLogged.payload.id).then((doc)=>{
            res.status(200).json(doc.scripts)
        })
    } catch (error) {
        res.status(500).json({
            msg:'Error',
            error
        })
    }

})

router.post('/scripts',authenticateToken,async(req,res)=>{
    const {title,logline,pitch,genres,format,status} = req.body
    const newScript = new Script({
        titre:title,
        status:status,
        logline:logline,
        pitch:pitch,
        genre:genres,
        format:format,
    })
    console.log('new: ',newScript)
    try {
        await newScript.save(async (err,doc)=>{
            await Profil.findByIdAndUpdate({_id:req.isLogged.payload.id},{$push:{scripts:doc}})
        })
        res.status(200).json({
            msg:'Script ajouté'
        })
    } catch (error) {
        res.status(500).json({
            msg:'Error',
            error
        })
    }
})

router.put('/scripts/:id',authenticateToken,async (req,res)=>{
    const {title,logline,pitch,genres,format,status} = req.body
    const {id} = req.params
    try {
        await Script.findByIdAndUpdate({_id:id},{
            titre:title,
            status:status,
            logline:logline,
            pitch:pitch,
            genre:genres,
            format:format,
        },{ new: true }).then(()=>{
            res.status(200).json({
                msg:'Script modifié'
            })
        })
    } catch (error) {
        res.status(500).json({
            msg:'Error',
            error
        })
    }
})

router.delete('/scripts/:id',authenticateToken,async(req,res)=>{
    const {id} = req.params
    try {
        await Script.findByIdAndDelete({_id:id}).then(async()=>{
            await Profil.findByIdAndUpdate({_id:req.isLogged.payload.id},{$pull:{scripts:{_id:id}}})
            res.status(200).json({
                msg:'Script effacé'
            })
        })
    } catch (error) {
        res.status(500).json({
            msg:'Error',
            error
        })
    }
})

module.exports = router