import Joi from "joi";
import { generalRules, objectIdRule } from "../../utils/general-rules.js";

const addApplicationSchema={
    body:Joi.object({
        jobId:Joi.string().custom(objectIdRule).required(),
        userId:Joi.string().custom(objectIdRule).required(),
        userTechSkills:Joi.array().items(Joi.string().min(2).max(20)).required(),
        userSoftSkills:Joi.array().items(Joi.string().min(2).max(20)).required()
    }),
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    })
}

const getAllAppForSpecificJobSchema={
    headers:Joi.object({
        token:generalRules.token.required(),
        ...generalRules.header
    }),
    params:Joi.object({
        id:Joi.string().custom(objectIdRule).required()
    })
}
export{
    addApplicationSchema,
    getAllAppForSpecificJobSchema
}