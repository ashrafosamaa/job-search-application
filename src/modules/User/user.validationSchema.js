import Joi from "joi";

export const signUpSchema ={
    body:Joi.object({
        firstName:Joi.string().min(3).max(10).required().trim(), 
        lastName:Joi.string().min(3).max(10).required().trim(), 
        email:Joi.string().email().required(), 
        recoveryEmail:Joi.string().email().required(), 
        password:Joi.string().min(6).max(11).required(), 
        mobileNumber:Joi.string().length(11).required(), 
        DOB: Joi.date().iso('YYYY-MM-DD').required(),
        role: Joi.string().valid('User', 'Company_HR').default('User'),
        status: Joi.string().valid('online', 'offline').default('offline'),
        favColor: Joi.string().valid('black', 'white', 'red', 'yellow', 'blue', 'green').required(),
    })
}

export const signInSchema = {
    body:Joi.object({
        email:Joi.string().email(), 
        mobileNumber:Joi.string().length(11), 
        password:Joi.string().min(6).max(11).required(), 
    })
}

export const updateSchema = {
    body:Joi.object({
        firstName:Joi.string().min(3).max(10).required().trim(), 
        lastName:Joi.string().min(3).max(10).required().trim(), 
        email:Joi.string().email().required(), 
        recoveryEmail:Joi.string().email().required(),
        mobileNumber:Joi.string().length(11).required(), 
        DOB: Joi.date().iso('YYYY-MM-DD').required(),
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    params: Joi.object({
        id: Joi.string().length(24).hex().required()
    })
}

export const deleteSchema = {
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    params: Joi.object({
        id: Joi.string().length(24).hex().required()
    })
}

export const getProfileSchema = {
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    params: Joi.object({
        id: Joi.string().length(24).hex().required()
    })
}

export const getDataSchema = {
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    params: Joi.object({
        id: Joi.string().length(24).hex().required()
    })
}

export const updatePassSchema = {
    body:Joi.object({
        password:Joi.string().min(6).max(11).required(), 
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    params: Joi.object({
        id: Joi.string().length(24).hex().required()
    })
}

export const recoveryEmailSchema = {
    body:Joi.object({
        recoveryEmail:Joi.string().email().required(), 
    })
}

export const getToken = {
    body:Joi.object({
        email:Joi.string().email(), 
        mobileNumber:Joi.string().length(11), 
        favColor: Joi.string().valid('black', 'white', 'red', 'yellow', 'blue', 'green').required(),
    })
}

export const forgetPass = {
    body:Joi.object({
        password:Joi.string().min(6).max(11).required(), 
        otp: Joi.string().required(),
    })
}
