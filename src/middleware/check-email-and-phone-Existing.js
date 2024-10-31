import { User } from "../../DataBase/model/User.model.js";
import { AppEroor } from "../utils/appError.js";

export const checkExisting= async(req,res,next) => {
    const {email,mobileNumber}=req.body;
    const isEmailExiste=await User.findOne({email})
    const isPhoneExiste=await User.findOne({mobileNumber})
    if(isEmailExiste) {
        return next(new AppEroor('email exists it must be uniqe',401))
    }
    if(isPhoneExiste) {
        return next(new AppEroor('Phone exists it must be uniqe',401))
    }
    next()
}