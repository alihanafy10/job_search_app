import nodemailer from 'nodemailer';
import { emailHtml } from './emailHtml.js';
import jwt from 'jsonwebtoken';
import { AppEroor } from '../utils/appError.js';

export const sendEmailsOTP=async (otp,name,email)=>{

    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_SENDER,
            pass:process.env.EMAIL_PASSWORD

        }
    })

    const info = await transporter.sendMail({
        from: `"3mk Ali Kato 👻" <${process.env.EMAIL_SENDER}>`, // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Ali</a>
    </div>
    <p style="font-size:1.1em">Hi, ${name}</p>
    <p>Thank you for choosing my App. Use the following OTP to complete your Sign Up procedures. OTP is valid for 1 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Ali Kato,<br />mesa mesa ya negm</p>
    
</div>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

   
}