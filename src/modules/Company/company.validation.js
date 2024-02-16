import Joi from "joi";

export const addSchema ={
    body:Joi.object({
        companyName:Joi.string().min(3).max(15).required().trim(), 
        description:Joi.string().min(8).required().trim(), 
        industry:Joi.string().min(8).required().trim(), 
        address:Joi.string().min(3).required().trim(), 
        numberOfEmployees:Joi.object().required(), 
        companyEmail:Joi.string().email().required(), 
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true)
}
export const updateSchema ={
    body:Joi.object({
        companyName:Joi.string().min(3).max(15).required().trim(), 
        description:Joi.string().min(8).required().trim(), 
        industry:Joi.string().min(8).required().trim(), 
        address:Joi.string().min(3).required().trim(), 
        numberOfEmployees:Joi.object().required(), 
        companyEmail:Joi.string().email().required(), 
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
        companyId: Joi.string().length(24).hex().required(), 
        userId:Joi.string().length(24).hex().required()
    })
}
export const deleteSchema ={
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
        companyId: Joi.string().length(24).hex().required(), 
        userId:Joi.string().length(24).hex().required(),
    })
}
export const displaySchema ={
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    params: Joi.object({
        companyId: Joi.string().length(24).hex().required(), 
    }),
    query: Joi.object({
        userId: Joi.string().length(24).hex().required(), 
    })
}
export const searchSchema ={
    body:Joi.object({
        companyName:Joi.string().min(3).max(15).required().trim(), 
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
}
export const applicationForJobSchema ={
    query:Joi.object({
        jobId:Joi.string().length(24).hex().required(),
        userId:Joi.string().length(24).hex().required(),
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
}
