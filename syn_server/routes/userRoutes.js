const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const {authenticateToken} = require('../controllers/authController');


router.get('/',authenticateToken,async(req,res)=>{
    const {isAuth} = req.body
    
    res.send('yeah')
})


module.exports = router