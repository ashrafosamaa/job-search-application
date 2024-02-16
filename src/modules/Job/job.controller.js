import Job from "../../../DB/models/job.model.js";
import Company from "../../../DB/models/company.model.js";
import Application from "../../../DB/models/application.model.js";
import generateUniqueString from "../../utils/generateUniqueString.js";
import cloudinaryConnection from "../../utils/cloudinary.js";

// ===============================add New Job====================================//
export const addJob = async (req, res, next)=> {
    const {_id} = req.authUser
    const {companyId} = req.query
    const {jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills} = req.body
    const user = await Company.findOne({_id: companyId, companyHR: _id})
    if(!user){
        return res.status(400).json({msg: "make sure of your data"})
    }
    const job = await Job.create({jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills, addedBy: _id, company:companyId})
    if(!job){
        return res.status(500).json({msg: "job creation failed"})
    }
    return res.status(201).json({msg: "job creation success", job})
}
// ===============================update Job Data====================================//
export const updateJob = async (req, res, next)=> {
    const {_id} = req.authUser
    const {jobId, userId} = req.query
    const {jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills} = req.body
    if(_id != userId){
        return res.status(400).json({msg: "you cannot update this job's data"})
    }
    const job = await Job.findByIdAndUpdate({_id: jobId, addedBy: userId}, {jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills}, {new: true})
    if (!job) return res.status(404).json({msg: "update failed"})
    res.status(200).json({ message: 'done', job})
}
// ===============================delete Job====================================//
export const deleteJob = async (req, res, next)=> {
    const {_id} = req.authUser
    const {jobId, userId} = req.query
    if(_id != userId){
        return res.status(400).json({msg: "you cannot delete this job's data"})
    }
    const job = await Job.findByIdAndDelete({_id: jobId, addedBy: userId})
    if (!job) return res.status(404).json({msg: "delete failed"})
    res.status(200).json({ message: 'done'})
} 
// ====================get all jobs for a company searched by name======================//
export const getAllJobs = async (req, res, next)=> {
    const job = await Job.find()
    .populate([{path: "company", select: "companyName industry address companyEmail -_id"}])
    if(!job){
        return res.status(404).json({msg: "no data found"})
    }
    res.status(200).json({ message: 'done', job})
}
// ========================get All companies and jobs offers inside it============================//
export const getCompaniesWithJobs = async (req, res, next)=> {
    const {companyName} = req.query
    const companies = await Company.find({companyName}).lean()
    for(const company of companies){
        const job = await Job.find({company: company._id})
        company.job = job
    }
    if(!companies){
        return res.status(404).json({msg: "no data found"})
    }
    res.status(200).json({ message: 'done', companies})
}
// ===========================search for a job match filters================================//
export const filterJobs = async (req, res, next)=> {
    const {jobTitle, jobLocation, workingTime, seniorityLevel, technicalSkills} = req.body
    const job = await Job.find({
        $or:[
            {jobTitle},
            {jobLocation},
            {workingTime}, 
            {seniorityLevel}, 
            {technicalSkills}
        ]
    })
    if(!job){
        return res.status(404).json({msg: "no data found"})
    }
    res.status(200).json({ message: 'done', job})
}
// ===============================add New Application====================================//
export const addApplication = async (req, res, next)=> {
    const {_id} = req.authUser
    const {jobId, userID, companyId} = req.query
    const{userTechSkills, userSoftSkills} = req.body
    if(_id != userID){
        return res.status(400).json({msg: "you cannot add application for this user"})
    }
    if (!req.file) {
        return res.status(400).json({ msg: "please upload your resume" });
    }
    const job = await Job.find({_id: jobId, company: companyId})
    if(!job){
        return res.status(400).json({msg: "make sure of job information"})
    }
    const company = await Company.findById({_id: companyId})
    if(!company){
        return res.status(400).json({msg: "make sure of company information"})
    }
    let pdf = [];
    let publicIdsArr = [];
    const folderId = generateUniqueString(7);
    const { secure_url, public_id } = await cloudinaryConnection().uploader.upload(req.file.path, {
        folder: `jobSearchApp/pdfs/${_id}/${folderId}`,
        use_filename: true,
        unique_filename: true
    });
    publicIdsArr.push(public_id);
    pdf.push({ secure_url, public_id, folderId });
    const application = await Application.create({jobId, userId: _id, userTechSkills, userSoftSkills, userResume: pdf, companyId})
    if(!application){
        const deleteData = await cloudinaryConnection().api.delete_resources(publicIdsArr)
        return res.status(500).json({msg: "add application failed"})
    }
    res.status(201).json({ message: 'done', application})
}
// =======================a try for making the bonus (you can ignore it)============================//
export const allAppInADay = async (req, res, next)=> {
    const {_id} = req.authUser
    const {companyName, userID} = req.query
    if(_id != userID){
        return res.status(400).json({msg: "you cannot access this data"})
    }
    const companies = await Company.find({companyName, companyHR: userID}).lean()
    for(const company of companies){
        const app = await Application.find({companyId: company._id}).populate([{path: "userId", select: "username"}])
        company.app = app
    }
    if(!companies.length){
        return res.status(404).json({msg: "no data found"})
    }
    res.status(200).json({ message: 'done', companies})
}