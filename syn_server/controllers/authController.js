const jwt = require('jsonwebtoken')
require('dotenv').config();
const {body,validationResult} = require('express-validator')



const userValidationRules = () => {
    return  [
        body("username").exists().withMessage('Un pseudo est requis').isLength({ min: 3 }).withMessage('Le pseudo est trop court'),
        body("email","Adresse e-mail invalide").isEmail(),
        body("password","Le mot de passe doit contenir au moins 6 caractère, dont un chiffre, une majuscule et un caractère spécial").isLength({min:6}).isStrongPassword()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    
    return res.status(422).json({
        "error":[
            {
                "msg":errors.errors[0].msg
            }
        ]
    })
}
  
const generateAccesToken = (username,id) => {
    return jwt.sign({username,id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'300s'});
};
const generateRefreshToken = (username,id) => {
    return jwt.sign({username,id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'1800s'});
};


const authenticateToken = (req,res,next) =>{
    
    const cookie = req.headers.cookie
    const token =  cookie && cookie.split('=')[1];
    console.log(token)
    if(!token){
        return res.sendStatus(401);
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decoded)
        req.body = {isAuth:true,payload:decoded,expired:false}
    } catch (error) {
        console.log(error)
        req.body ={isAuth:false,payload:null,expired: error}
    }
    
};

const authenticateRefreshToken = (req,res,next) =>{
    /* const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token =  authHeader && authHeader.split(' ')[1]; */
    const cookie = req.headers.cookie
    const token =  cookie && cookie.split('=')[1];
    
    if(!token){
        return res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.sendStatus(401);
        }
        delete user.iat;
        delete user.exp;
        const refreshedToken = generateRefreshToken(user);
        res.send({
            accesToken: refreshedToken,
        })
    });
};


module.exports = {
    userValidationRules,
    validate,
    generateAccesToken,
    generateRefreshToken,
    authenticateToken,
    authenticateRefreshToken
}

