import Joi from "joi";
import { generalRules, objectIdRule } from "../../utils/general-rules.js";


const addCompanySchema={
    body:Joi.object({
        companyName:Joi.string().min(3).max(20).pattern(/^[a-zA-Z0-9_ ]+$/).required().messages({'string.pattern.base':'pattern error of name'}),
        description:generalRules.discriptions,
        industry:Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_ ]+$/).required().messages({'string.pattern.base':'industry error'}),
        address:Joi.string().max(100).pattern(/^[\w',-\/.\s]{3,}$/).required().messages({'string.pattern.base':'industry error'}),
        numberOfEmployees:Joi.number().min(11).max(20).required(),
        companyEmail:generalRules.email.required(),
        companyHR:Joi.string().custom(objectIdRule).required()
    }),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    })
}
const updateCompanySchema={
    body:Joi.object({
        companyName:Joi.string().min(3).max(20).pattern(/^[a-zA-Z0-9_ -]+$/).optional().messages({'string.pattern.base':'pattern error of name'}),
        description:generalRules.discriptions.optional(),
        industry:Joi.string().min(3).max(100).pattern(/^[a-zA-Z0-9_ ]+$/).optional().messages({'string.pattern.base':'industry error'}),
        address:Joi.string().max(100).pattern(/^[\w',-\/.\s]{3,}$/).optional().messages({'string.pattern.base':'industry error'}),
        numberOfEmployees:Joi.number().min(11).max(20).optional(),
        companyEmail:generalRules.email.optional(),
    }),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
    params:Joi.object({
        id:Joi.string().custom(objectIdRule).required()
    })
}

const deleteCompanySchema={
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
    params:Joi.object({
        id:Joi.string().custom(objectIdRule).required()
    })
}

const getCompanySchema={
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
    params:Joi.object({
        id:Joi.string().custom(objectIdRule).required()
    }),
    query:Joi.object({companyName:Joi.string().min(3).max(20).pattern(/^[a-zA-Z0-9_ -]+$/).optional().messages({'string.pattern.base':'pattern error of name'}),})
}

const searchCompanySchema={
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
    query:Joi.object({
        name:Joi.string().min(3).max(20).pattern(/^[a-zA-Z0-9_ -]+$/).optional().messages({'string.pattern.base':'pattern error of name'}),
    })
}
export {
    addCompanySchema,
    updateCompanySchema,
    deleteCompanySchema,
    getCompanySchema,
    searchCompanySchema
}