const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();


const sendMail = async(rotp,sent_to, sent_from, reply_to)=>{
    const otp = rotp
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        PORT: "587",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized:false,
        }
    })
    const options = {
        from : {
            name:"SH Organization",
            address:sent_from,
        },
        to : sent_to,
        replyTo: reply_to,
        subject: "OTP From SH-Organization",
        //html: htmlMessage,
        html: `<h1 align="center">Your OTP is ${otp}</h1>
                <p algn="center">Expires in 10mins</p>
        `,
    }

    //Send Mail
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}
module.exports = sendMail