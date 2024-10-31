
import { Company } from "../../DataBase/model/Company.model.js";
import { AppEroor } from "../utils/appError.js";
import { catchError } from "./error-handdling.js";

export const checkExistingCompany=catchError( async(req,res,next) => {
    const {companyName,companyEmail}=req.body;
    const isEmailExiste=await Company.findOne({companyEmail})
    const isNameExiste=await Company.findOne({companyName})
    if(isEmailExiste) {
        return next(new AppEroor('email exists it must be uniqe',401))
    }
    if(isNameExiste) {
        return next(new AppEroor('Name exists it must be uniqe',401))
    }
    next()
})