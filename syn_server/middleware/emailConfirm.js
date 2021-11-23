require('dotenv').config();
const JWT = require("jsonwebtoken");
const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS
    },
})
const sendEmailConfirm = (userId,username,email) => {

    JWT.sign({
        userId: userId,
        username:username,
    },
    process.env.EMAIL_SECRET,
    {
        expiresIn:"3m",
    },
    (err,emailToken)=>{
        const url = `http://localhost:3000/confirmation/${emailToken}`;

        transporter.sendMail({
            from:'Syn Do not reply <syn_do_not_reply@gmail.com>',
            to:email,
            subject:'Confirmation de votre Email',
            html:`<p>Veuillez cliquer sur ce lien pour confirmer votre inscription. :</p><a href="${url}">Confirmer votre compte</a> `
        })
    }
    )
}

module.exports={
    sendEmailConfirm,
}