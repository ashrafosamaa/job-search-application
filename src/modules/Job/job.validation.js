import Joi from "joi";

export const addSchema ={
    body:Joi.object({
        jobTitle: Joi.string().min(3).max(30).required().trim(), 
        jobLocation: Joi.string().valid( 'onsite', 'remotely', 'hybrid').required(), 
        workingTime: Joi.string().valid( 'part-time' , 'full-time').required(), 
        seniorityLevel: Joi.string().valid( 'Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(), 
        jobDescription: Joi.string().min(5).required().trim(), 
        technicalSkills: Joi.array().required(), 
        softSkills: Joi.array().required(),
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
        companyId: Joi.string().length(24).hex().required(), 
    })
}
export const updateSchema ={
    body:Joi.object({
        jobTitle: Joi.string().min(3).max(30).required().trim(), 
        jobLocation: Joi.string().valid( 'onsite', 'remotely', 'hybrid').required(), 
        workingTime: Joi.string().valid( 'part-time' , 'full-time').required(), 
        seniorityLevel: Joi.string().valid( 'Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(), 
        jobDescription: Joi.string().min(5).required().trim(), 
        technicalSkills: Joi.array().required(), 
        softSkills: Joi.array().required(),
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
        jobId: Joi.string().length(24).hex().required(), 
        userId: Joi.string().length(24).hex().required()
    })
}
export const deleteSchema ={
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
        jobId: Joi.string().length(24).hex().required(), 
        userId: Joi.string().length(24).hex().required()
    })
}
export const getAllSchema ={
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
}
export const getCompaniesSchema ={
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
        companyName:Joi.string().min(3).max(15).required().trim(), 
    })
}
export const filterJobsSchema ={
    body:Joi.object({
        jobTitle: Joi.string().min(3).max(30).required().trim(), 
        jobLocation: Joi.string().valid( 'onsite', 'remotely', 'hybrid').required(), 
        workingTime: Joi.string().valid( 'part-time' , 'full-time').required(), 
        seniorityLevel: Joi.string().valid( 'Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(), 
        technicalSkills: Joi.array().required(), 
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
}
export const addAppSchema ={
    body:Joi.object({
        userTechSkills: Joi.array(), 
        userSoftSkills: Joi.array(), 
    }),
    headers: Joi.object({
        accesstoken: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
        userID: Joi.string().length(24).hex().required(),
        jobId: Joi.string().length(24).hex().required(),
        companyId: Joi.string().length(24).hex().required()
    })
}


