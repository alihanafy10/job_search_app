import { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
import { hashSync } from "bcrypt"

import { User } from "../../../DataBase/model/User.model.js"
import { sendEmails } from "../../email/email.js";
import { catchError } from "../../middleware/error-handdling.js"
import { AppEroor } from "../../utils/appError.js";
import { sendEmailsOTP } from "../../email/email-otp.js";


/*
signup 
step 1: validation 
step 2: checkExisting (email, phone)
step 3: hash password
*/
const signup= catchError( async(req,res,next)=>{
    //fetch data from req
    const{firstName,lastName,email}=req.body;
    //add username in body
    req.body.userName=`${firstName} ${lastName}`
    //create data

   const data=await User.create(req.body)
   data.password=undefined;
   //send email
   sendEmails(email,req.body.userName,req)
   res.status(201).json({message:'success',data})
   })

/*
signin
step 1:validation
step 2:fetch user
step 3:emailOrPhone ckeck
step 4:match password
step 5:check if user conferm email
step 6:generate user token
step 7:update online
*/
   const signin=catchError(
    async(req, res, next)=>{
        const {password,emailOrMobile}=req.body
        
       //fetch user
       const user = await User.findOne({
        $or: [
            { email: emailOrMobile },
            {recoveryEmail: emailOrMobile },
            { mobileNumber: emailOrMobile }
        ]
      
          });
          console.log(user);
         //emailOrPhone ckeck
        if(!user){
            return next(new AppEroor('email not found',404))
        }
        
        //match password
        const isMatch=compareSync(password,user.password)
        if(!isMatch){
            return next(new AppEroor('invalid password',404))
        }

        //check if user conferm email
        if(user.confirmEmail==false){
            return next(new AppEroor('signup and confirm email first',404))
        }
         //generate user token
    const token=jwt.sign(
        {userId:user._id,
            email:user.email,
            role:user.role
        },
        process.env.USER_TOKEN,
        {expiresIn:'30d'},
    )
    //update online 
    await User.findByIdAndUpdate(user._id,{
        status:'online'})
    res.status(200).json({message:'success',token})
    })

    /*
    update acc
    step 1:validation
    step 2:authentication
    step 3:authorization
    step 4:check email and phone existing
    step 5:handel user name
    step 6:update data
    step 7:send email if updated email
    step 8:change confirmed email to false to verify email first
     */
    const updateAccount=catchError(async(req,res,next)=>{
        const {firstName,lastName,email,recoveryEmail,DOB,mobileNumber}=req.body
        let userName=''
        //handel user name
        if(!lastName){
            userName=`${firstName} ${req.authUser.lastName}`
        }else{
            userName=`${firstName} ${lastName}`
        }
        //update data
        const data=await User.findByIdAndUpdate(req.authUser._id,{firstName,lastName,userName,email,recoveryEmail,DOB,mobileNumber},{new:true}).select('-password')
        
        if(email){
            //send mail to verify
            sendEmails(email,userName)
            //let confirm email false to verify mail first 
            await User.findByIdAndUpdate(req.authUser._id,{confirmEmail:false},{new:true})
            return  res.status(201).json({message:'verify email',data})
        }
        res.status(201).json({message:'success',data})
    })

     /*
    delet acc
    step 1:validation
    step 2:authentication
    step 3:authorization
    step 4:delete acc
    */
    const deletAccount =catchError(async(req,res,next)=>{
        await User.findByIdAndDelete(req.authUser._id)
        res.status(201).json({message:'success'})
    })
    
     /*
    delet acc
    step 1:validation
    step 2:authentication
    step 3:authorization
    step 4:get acc
    */
    const getDataAccount =catchError(async(req,res,next)=>{
        const data = await User.findById(req.authUser._id).select('-password')
        res.status(200).json({message:'success',data})
    })
/*
get any account
    step 1:validation
    step 2:authentication
    step 3:authorization
    step 4:get acc
*/
    const getanyAccount =catchError(async(req,res,next)=>{
        const data= await User.findById(req.params.id).select('-password')
        res.status(200).json({message:'success',data})
      })
/*
update password
    step 1:validation
    step 2:authentication
    step 3:authorization
    step 4:update password
     */
      const updatePss=catchError(async(req,res,next)=>{
        await User.findByIdAndUpdate(req.authUser._id,{password:req.body.password})
        res.status(201).json({message:'success'})
      })

/*
Get all accounts associated to a specific recovery Email 
step 1:validation
    step 2:authentication
    step 3:authorization
    step 4:get accounts
*/
      const getAllAccSpecifirecEmail=catchError(async(req,res,next)=>{
        const data= await User.find({recoveryEmail:req.body.recoveryEmail}).select('-password')
       res.status(200).json({message:'success',data})
      })

      const sendOtp=catchError(async(req,res,next)=>{
        const {email}=req.body
        //fetch user data
        const user=await User.findOne({email})

        //check if user available
        if(!user)return next(new AppEroor('User not found', 404));
//create otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
//add otp to user
        user.otp = otp
        //add date +1m to distroy otp
        user.endDateOpt=new Date()
        user.endDateOpt.setMinutes(user.endDateOpt.getMinutes() + 1);
        //save change
        await user.save()
        //send mail
        sendEmailsOTP(otp,user.userName,email)

        res.status(200).json({ message: 'OTP sent successfully' });
      })

      const resetPass=catchError(async(req,res,next)=>{
        const { email, otp, newPassword } = req.body;
        //fetch user 
        const user = await User.findOne({ email})

        //check if user is already
        if(!user)return next(new AppEroor('User not found', 404));

        //check otp
        if(user.otp!=otp||user.endDateOpt<new Date())return next(new AppEroor('Invalid OTP', 400));

        //hash pass
        const hashedPassword = hashSync(newPassword, +process.env.HASH_SALT);
        
        //set new password
        user.password=hashedPassword 
        user.otp=undefined
        user.endDateOpt=null
        await user.save()
        res.status(201).json({ message: 'Password reset successfully' });
      })
export{
    signup,
    signin,
    updateAccount,
    deletAccount,
    getDataAccount,
    getanyAccount,
    updatePss,
    getAllAccSpecifirecEmail,
    sendOtp,
    resetPass

}