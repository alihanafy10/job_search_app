import Joi from "joi";
import { Types } from "mongoose";

export const generalRules={
    first_last_name:Joi.string()
    .min(3)
    .max(10)
    .alphanum()
    .messages({'string.alphanum':"firstName must be alpha-numeric characters [A-Z,a-z,0-9]"}),
    email:Joi.string().email().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).messages({'string.pattern.base':'you must insert valid email'}),
    password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({'string.pattern.base':'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'}),
    mobileNumber:Joi.string().pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/).messages({'string.pattern.base':'enter valid phone number'}),
    token:Joi.string().pattern(/^[a-zA-Z-0-9. _]+[-]?$/).messages({'string.pattern.base':'enter valid token'}),
    header:{
        "content-type":Joi.string().optional(),
        "user-agent":Joi.string().optional(),
        accept:Joi.string().optional(),
        "postman-token":Joi.string().optional(),
        host:Joi.string().optional(),
        "accept-encoding":Joi.string().optional(),
        connection:Joi.string().optional(),
        "content-length":Joi.number().optional(),
    },
    discriptions:Joi.string().max(500).pattern(/^[a-zA-Z0-9_ -]+$/).messages({'string.pattern.base':'discription error'}),
}

export function objectIdRule(value,helper){
    const isValidObjectId =Types.ObjectId.isValid(value);
    return isValidObjectId ?value :helper.messages('invalidObjectId');
}