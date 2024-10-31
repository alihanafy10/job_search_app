import Joi from "joi"
import { generalRules, objectIdRule } from "../../utils/general-rules.js"

const signupSchema={
  body:Joi.object({
    firstName:generalRules.first_last_name.required(),
    lastName:generalRules.first_last_name.required(),
    email:generalRules.email.required(),
    password:generalRules.password,
    rePassword:Joi.string().valid(Joi.ref('password')).required(),
    recoveryEmail:generalRules.email,
    DOB:Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({'string.pattern.base':'enter valid date like yyyy-mm-dd'}),
    mobileNumber:generalRules.mobileNumber.required(),
    role:Joi.string().required().valid('User',"Company_HR")
})
}

const signinSchema={
    body:Joi.object({
        emailOrMobile:Joi.alternatives().try(
            generalRules.email,
            generalRules.mobileNumber,
        ).required(),
        password:generalRules.password
    })
}

const updateSchema={
    body:Joi.object({
        email:generalRules.email,
        mobileNumber:generalRules.mobileNumber,
        recoveryEmail:generalRules.email,
        DOB:Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).messages({'string.pattern.base':'enter valid date like yyyy-mm-dd'}),
        firstName:generalRules.first_last_name,
        lastName:generalRules.first_last_name,
    }).options({presence:'optional'}),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    })
}


const deletSchema={
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    })
}
const getUserAccount=deletSchema

const getanyAccountSchema={
    params:Joi.object({
        id:Joi.string().custom(objectIdRule).required()
    }),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    })
}

const updatePassSchema={
    body:Joi.object({
        password:generalRules.password
    }),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    })
}

const getAllAccSpecifirecEmailSchema={
    body:Joi.object({
        recoveryEmail:generalRules.email.required()
    }),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    })
}

const sendOtpSchema={
    body:Joi.object({
        email:generalRules.email.required()
    }),
}

const resetPassSchema={
    body:Joi.object({
        email:generalRules.email.required(),
        otp:Joi.string().length(6),
        newPassword:generalRules.password
    })
}
export{
    signupSchema,
    signinSchema,
    updateSchema,
    deletSchema,
    getUserAccount,
    getanyAccountSchema,
    updatePassSchema,
    getAllAccSpecifirecEmailSchema,
    sendOtpSchema,
    resetPassSchema
}