
import { hashSync } from "bcrypt"
import { catchError } from "./error-handdling.js"
export const hashPass= catchError(async(req,res,next)=>{
    req.body.password=hashSync(req.body.password,+process.env.HASH_SALT)
    next()
})
