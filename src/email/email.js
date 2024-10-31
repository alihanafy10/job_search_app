import nodemailer from 'nodemailer';
import { emailHtml } from './emailHtml.js';
import jwt from 'jsonwebtoken';
import { AppEroor } from '../utils/appError.js';

export const sendEmails=async (email,name,req)=>{

    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_SENDER,
            pass:process.env.EMAIL_PASSWORD

        }
    })

    //generate token 
    const token = jwt.sign({email},process.env.VERIFY_TOKEN,{expiresIn:'5minutes'})
    const info = await transporter.sendMail({
        from: `"3mk Ali Kato 👻" <${process.env.EMAIL_SENDER}>`, // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: emailHtml(name,token,req), // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

   
}