import { Schema , model} from "mongoose";
import moment from "moment";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 11
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 11
    },
    username: {
        type: String,
        default : function() {
            return this.firstName.toLowerCase() + this.lastName.toLowerCase();
        }, 
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 11
    },
    recoveryEmail: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        validate: {
            validator: function (value) {
                return moment(value, 'YYYY-MM-DD', true).isValid();
            },
                message: 'Invalid date format. Please use the YYYY-MM-DD format.',
            },
            set: function (value) {
                const date = moment(value, 'YYYY-MM-DD', true);
                return date.isValid() ? date.format('YYYY-MM-DD') : value;
        },
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        min: 11,
        max: 11
    },
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
        default: 'User',
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
    },
    favColor: {
        type: String,
        enum: ['white', 'balck', 'red', 'yellow', 'blue', 'green'],
        required: true,
    },
    otp: {
        type: String
    }
},{timestamps:true})

const User = model('User', userSchema)

export default User