import { AppEroor } from "../utils/appError.js";
import { catchError } from "./error-handdling.js";

export const authorization=(allowedRules)=>{
    return catchError(
        async(req,res,next) => {
            const user=req.authUser.role
            if(!allowedRules.includes(user))
                return next(new AppEroor('Authrization Error',401,'you are not allowed to access this route'))
            next()
        }
    )
}