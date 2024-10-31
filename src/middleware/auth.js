import { User } from "../../DataBase/model/User.model.js"
import { AppEroor } from "../utils/appError.js"
import jwt from 'jsonwebtoken'
import { catchError } from "./error-handdling.js"
export const auth=catchError(
    async(req,res,next)=>{
        //destructing the token from req
        const {token}=req.headers
        if(!token)return next(new AppEroor('signin first',401))
    
            //verify token
            if(!token.startsWith('7ambola'))return next(new AppEroor('invalid token',401))
    
                //decode
                const originalToken=token.split(' ')[1]
                let decodeData
                 try{
                    decodeData=jwt.verify(originalToken,process.env.USER_TOKEN)
                 }catch(error){
                    if (error.name === 'TokenExpiredError') {
                        const decoded = jwt.decode(originalToken);
                        await User.findByIdAndUpdate(decoded.userId, { status: 'offline' });
                        return next(new AppEroor('Token expired, please login again', 401));
                    } else {
                        return next(new AppEroor('invalid token', 401));
                    }
                 }
                if(!decodeData.userId)return next(new AppEroor('invalid token',400))
                    //find user
                const user=await User.findById(decodeData.userId).select('-password')
                if(!user)return next(new AppEroor('please signup and try to login',404))
                    if(user.confirmEmail==false)return next(new AppEroor('verify email',401))
                    req.authUser=user
                    next()
                }
)