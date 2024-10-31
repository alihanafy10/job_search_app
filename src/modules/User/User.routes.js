import { Router } from "express";
import jwt from 'jsonwebtoken'

import {  deletAccount, getAllAccSpecifirecEmail, getanyAccount, getDataAccount, resetPass, sendOtp, signin, signup, updateAccount, updatePss } from "./User.controller.js";
import { validationMiddleware } from "../../middleware/validation.js";
import { deletSchema, getAllAccSpecifirecEmailSchema, getanyAccountSchema, getUserAccount, resetPassSchema, sendOtpSchema, signinSchema, signupSchema, updatePassSchema, updateSchema } from "./User.schema.js";
import { hashPass } from "../../middleware/hash-password.js";
import { checkExisting } from "../../middleware/check-email-and-phone-Existing.js";
import { catchError } from "../../middleware/error-handdling.js";
import { AppEroor } from "../../utils/appError.js";
import { User } from "../../../DataBase/model/User.model.js";
import { auth } from "../../middleware/auth.js";
import { authorization } from "../../middleware/Authorization.js";
import {systemRoles} from '../../utils/system.roles.js'
const userRouter = Router();

userRouter.post('/signup',validationMiddleware(signupSchema),checkExisting,hashPass,signup)
userRouter.get('/verifyEmail/:token',catchError(async(req,res,next)=>{
jwt.verify(req.params.token,process.env.VERIFY_TOKEN,async(err,data)=>{
    if(err)return next(new AppEroor('invalid token',401,err))
        await User.findOneAndUpdate({email:data.email},{confirmEmail:true})
res.json({message:'success',email:data.email})
})

}))
userRouter.post('/signin',validationMiddleware(signinSchema),signin)
userRouter.put('/updateAcc',validationMiddleware(updateSchema),auth,authorization([systemRoles.USER,systemRoles.COMPANY_HR]),checkExisting,updateAccount)
userRouter.delete('/deleteAcc',validationMiddleware(deletSchema),auth,authorization([systemRoles.USER,systemRoles.COMPANY_HR]),deletAccount)
userRouter.get('/dataAcc',validationMiddleware(getUserAccount),auth,authorization([systemRoles.USER,systemRoles.COMPANY_HR]),getDataAccount)
userRouter.get('/dataAnyAcc/:id',validationMiddleware(getanyAccountSchema),auth,authorization([systemRoles.USER,systemRoles.COMPANY_HR]),  getanyAccount)
userRouter.put('/updatePass',validationMiddleware(updatePassSchema),auth,authorization([systemRoles.USER,systemRoles.COMPANY_HR]),hashPass,  updatePss)
userRouter.get('/getAllAccSpecifirecEmail',validationMiddleware(getAllAccSpecifirecEmailSchema),auth,authorization([systemRoles.USER,systemRoles.COMPANY_HR]),getAllAccSpecifirecEmail)
userRouter.post('/send-otp',validationMiddleware(sendOtpSchema),sendOtp)
userRouter.post('/reset-password',validationMiddleware(resetPassSchema),resetPass)






export default userRouter;

