import Application from "../../../DB/models/application.model.js";
import Company from "../../../DB/models/company.model.js";
import Job from "../../../DB/models/job.model.js";

// ===============================add Company====================================//
export const addCompany = async (req, res, next)=> {
    const {_id} = req.authUser
    const {companyName, description, industry, address, numberOfEmployees, companyEmail} = req.body
    const isNameChecker = await Company.findOne({companyName})
    if(isNameChecker){
        return res.status(400).json({msg: "this name used before"})
    }
    const isEmailChecker = await Company.findOne({companyEmail})
    if(isEmailChecker){
        return res.status(400).json({msg: "this email used before"})
    }
    const company = await Company.create({companyName, description, industry, address, numberOfEmployees, companyEmail, companyHR: _id})
    if(!company){
        return res.status(500).json({msg: "company creation failed"})
    }
    return res.status(201).json({msg: "company creation success", company})
}
// =============================add Company Data=================================//
export const updateCompany = async (req, res, next)=> {
    const {_id} = req.authUser
    const {companyId, userId} = req.query
    const {companyName, description, industry, address, numberOfEmployees, companyEmail} = req.body
    if(_id != userId){
        return res.status(400).json({msg: "you cannot update this company's data"})
    }
    const isNameChecker = await Company.findOne({companyName, _id: { $ne: companyId }})
    if(isNameChecker){
        return res.status(400).json({msg: "this name used before"})
    }
    const isEmailChecker = await Company.findOne({companyEmail, _id: { $ne: companyId }})
    if(isEmailChecker){
        return res.status(400).json({msg: "this email used before"})
    }
    const company = await Company.findByIdAndUpdate({_id: companyId, companyHR: userId}, {companyName, description, industry, address, numberOfEmployees, companyEmail}, {new: true})
    if (!company) return res.status(404).json({msg: "update failed"})
    res.status(200).json({ message: 'done', company})
}
// ===============================delete Company====================================//
export const deleteCompany = async (req, res, next)=> {
    const {_id} = req.authUser
    const {companyId, userId} = req.query
    if(_id != userId){
        return res.status(400).json({msg: "you cannot delete this company's data"})
    }
    const company = await Company.findByIdAndDelete({_id: companyId, companyHR: userId})
    if (!company) return res.status(404).json({msg: "delete failed"})
    res.status(200).json({ message: 'done'})
}
// ===============================get Company data====================================//
export const getCompany = async (req, res, next)=> {
    const {_id} = req.authUser
    const {companyId} = req.params
    const{userId} = req.query
    if(_id != userId){
        return res.status(400).json({msg: "you can not access this data"})
    }
    const companies = await Company.find({_id: companyId}).lean()
    if (!companies.length) return res.status(404).json({msg: "no data found"})
    for(const company of companies){
        const job = await Job.find({company: companyId})
        company.job = job
    }
    res.status(200).json({ message: 'done', companies})
}
// ===============================search Company by Name====================================//
export const searchCompany = async (req, res, next)=> {
    const {companyName} = req.body
    const company = await Company.findOne({companyName:companyName.trim()}).select('-_id')
    if (!company) return res.status(404).json({msg: "no data found"})
    res.status(200).json({ message: 'done', company})
}
// ==========================find jobs and applications on it=============================//
export const allAppForJob = async (req, res, next)=> {
    const {_id} = req.authUser
    const {jobId, userId} = req.query
    if(userId != _id){
        return res.status(400).json({msg: "you cannot access this data"})
    }
    const jobs = await Job.find({_id: jobId ,addedBy: userId}).lean()
    if(!jobs){
        return res.status(200).json({msg: "no data found"})
    }
    for(const job of jobs){
        const app = await Application.find({jobId}).populate([{path: "userId", select: "username email mobileNumber"}])
        job.app = app
    }
    res.status(200).json({msg: "done", jobs})
}
