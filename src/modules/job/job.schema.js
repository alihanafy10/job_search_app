import Joi from "joi";
import { generalRules, objectIdRule } from "../../utils/general-rules.js";

const addJobSchema={
    body:Joi.object({
        jobTitle: Joi.string().pattern(/^[a-zA-Z0-9_ -]+$/).required().messages({'string.pattern.base':'pattern error of jobTitle'}),
        jobLocation:Joi.string().valid('onsite','remotely','hybrid').required(),
        workingTime:Joi.string().valid('part-time','full-time').required(),
        seniorityLevel:Joi.string().valid('Junior','Mid-Level','Senior,Team-Lead','CTO').required(),
        jobDescription:generalRules.discriptions.required(),
        technicalSkills:Joi.array().items(Joi.string().min(2).max(20)).required(),
        softSkills:Joi.array().items(Joi.string().min(2).max(20)).required(),
        addedBy:Joi.string().custom(objectIdRule).required(),
        company:Joi.string().custom(objectIdRule).required()
    }),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    })
}

const updateJobSchema={
    body:Joi.object({
        jobTitle: Joi.string().pattern(/^[a-zA-Z0-9_ -]+$/).required().messages({'string.pattern.base':'pattern error of jobTitle'}),
        jobLocation:Joi.string().valid('onsite','remotely','hybrid').required(),
        workingTime:Joi.string().valid('part-time','full-time').required(),
        seniorityLevel:Joi.string().valid('Junior','Mid-Level','Senior,Team-Lead','CTO').required(),
        jobDescription:generalRules.discriptions.required(),
        technicalSkills:Joi.array().items(Joi.string().min(2).max(20)).required(),
        softSkills:Joi.array().items(Joi.string().min(2).max(20)).required(),
    }),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
    params:Joi.object({
        id:Joi.string().custom(objectIdRule).required()
    })
}

const getAllJobSchema={
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
    query:Joi.object({
        jobLocation:Joi.string().valid('onsite','remotely','hybrid').optional(),
        workingTime:Joi.string().valid('part-time','full-time').optional(),
        jobTitle: Joi.string().pattern(/^[a-zA-Z0-9_ -]+$/).optional().messages({'string.pattern.base':'pattern error of jobTitle'}),
        seniorityLevel:Joi.string().valid('Junior','Mid-Level','Senior,Team-Lead','CTO').optional(),
        technicalSkills:Joi.string().pattern(/^[a-zA-Z0-9 ,]+$/).optional(),
    })
}
const deleteJobSchema={
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
    params:Joi.object({
        id:Joi.string().custom(objectIdRule).required()
    })
}

const getAllJobWithCompanySchema={
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
}

export{
    addJobSchema,
    updateJobSchema,
    deleteJobSchema,
    getAllJobWithCompanySchema,
    getAllJobSchema
}