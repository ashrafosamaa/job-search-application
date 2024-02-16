import { Schema , model} from "mongoose";

const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    jobLocation: {
        type: String,
        enum: ['onsite', 'remotely', 'hybrid'],
        required: true,
    },
    workingTime: {
        type: String,
        enum: ['part-time', 'full-time'],
        required: true,
    },
    seniorityLevel: {
        type: String,
        enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    technicalSkills: {
        type: [String], 
        required: true,
    },
    softSkills: {
        type: [String], 
        required: true,
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    }
},{timestamps:true})

const Job = model('Job', jobSchema)

export default Job