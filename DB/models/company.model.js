import { Schema , model} from "mongoose";

const companySchema = new Schema({
    companyName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: {
            min: {
                type: Number,
                required: true,
            },
            max: {
                type: Number,
                required: true,
            },
        },
        validate: {
            validator: function (value) {
                if (!value || typeof value !== 'object' || value.min === undefined || value.max === undefined){
                    return false;
                }
                return value.min <= value.max;
            },
            message: 'Invalid numberOfEmployees range.',
        },
        required: true,
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true,
    },
    companyHR: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{timestamps:true})

const Company = model('Company', companySchema)
 
export default Company