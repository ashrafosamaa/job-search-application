import User from "../../../DB/models/user.model.js";
import generateUniqueString from "../../utils/generateUniqueString.js";
import bcrybt from "bcryptjs"
import jwt from "jsonwebtoken"

// ===============================add new user==============================//
export const signUp = async (req, res, next)=>{
    const {firstName, lastName, email, password, recoveryEmail, mobileNumber, DOB, favColor, role} =  req.body
    const emailChecker = await User.findOne({email})
    if(emailChecker){
        return res.status(409).json({msg: "email used before"})
    }
    const mobileNumberChecker = await User.findOne({mobileNumber})
    if(mobileNumberChecker){
        return res.status(409).json({msg: "mobile number used before"})
    }
    const hashPassword = bcrybt.hashSync(password, +process.env.SALT_ROUNDS)
    const otp = generateUniqueString(5)
    const newUser = await User.create({firstName, lastName, email, password: hashPassword, recoveryEmail, mobileNumber, DOB, favColor, otp: otp, role})
    if(!newUser){
        return res.status(500).json({msg: "user registration failed"})
    }
    return res.status(201).json({msg: "user registration success", newUser})
}
// ===============================signin====================================//
export const signIn = async (req, res, next)=>{
    const {email, mobileNumber, password} = req.body
    if(!email && !mobileNumber){
        return res.status(404).json({msg: "please enter your data"})
    }
    if(!password){
        return res.status(404).json({msg: "please enter your password"})
    }
    const user = await User.findOne({
        $or: [
            {mobileNumber},
            {email}
        ]
    })
    if(!user){
        return res.status(404).json({msg: "invalid login credentials"})
    }
    const isPasswordCorr = bcrybt.compareSync(password, user.password)
    if(!isPasswordCorr){
        return res.status(404).json({msg: "invalidddd login credentials"})
    }
    const token = jwt.sign({id: user._id, userName: user.username, email: user.email},
        process.env.SIGNATURE,
        {
            expiresIn: '1h'
        }
    )
    await User.findByIdAndUpdate({_id: user._id} ,{status: "online"})
    return res.status(200).json({msg: "login success", token})
}
// ===============================update Account====================================//
export const updateAcc = async (req, res, next)=>{
    const {_id} = req.authUser
    const{id} = req.params
    if(_id != id){
        return res.status(400).json({msg: "you cannot update this profile's data"})
    }
    const{firstName, lastName, email, recoveryEmail, mobileNumber, DOB} = req.body
    const emailChecker = await User.findOne({email, _id: { $ne: _id }})
    if(emailChecker){
        return res.status(404).json({msg: "this email used before"})
    }
    const mobileNumberChecker = await User.findOne({mobileNumber, _id: { $ne: _id }})
    if(mobileNumberChecker){
        return res.status(404).json({msg: "this mobile number used before"})
    }
    const updateUser = await User.findByIdAndUpdate(_id, {firstName, lastName, email, recoveryEmail, mobileNumber, DOB, username:firstName.toLowerCase() + lastName.toLowerCase()}, {new: true})
    if (!updateUser) return res.status(404).json({msg: "update failed"})
    res.status(200).json({ message: 'done', updateUser})
}
// ===============================delete Account====================================//
export const deleteAcc = async (req, res, next)=>{
    const {_id} = req.authUser
    const {id} = req.params
    if(_id != id){
        return res.status(400).json({msg: "you cannot delete this profile"})
    }
    const deleteUser = await User.findByIdAndDelete(_id)
    if (!deleteUser) return res.status(404).json({msg: "delete failed"})
    res.status(200).json({ message: 'done' })
}
// ===============================display my Account====================================//
export const getAcc = async (req, res, next)=>{
    const {_id} = req.authUser
    const {id} = req.params
    if(_id != id){
        return res.status(400).json({msg: "you cannot access this profile daaaata"})
    }
    const getUserAcc = await User.findById(_id).select('-password -_id -createdAt -updatedAt -__v')
    if (!getUserAcc) return res.status(404).json({msg: "failed"})
    res.status(200).json({ message: 'done', getUserAcc})
}
// ===============================display another Account====================================//
export const getUser = async (req, res, next)=>{
    const {_id} = req.authUser
    const {id} = req.params
    const getUserAcc = await User.findById(id).select('-password -_id -createdAt -updatedAt -__v -otp -favColor -recoveryEmail')
    if (!getUserAcc) return res.status(404).json({msg: "failed"})
    if(_id == id){
        return res.status(200).json({ message: 'this is your account', getUserAcc}) 
    }
    res.status(200).json({ message: 'done', getUserAcc})
}
// ===============================update Password====================================//
export const updatePass = async (req, res, next)=>{
    const {password, oldPassword} = req.body
    const {id} = req.params
    const {_id} = req.authUser
    if(_id != id){
        return res.status(400).json({msg: "you cannot update this profile's password"})
    }
    if(!password){
        return res.status(404).json({msg: "please enter the new password"})
    }
    if(!oldPassword){
        return res.status(404).json({msg: "please enter your old password"})
    }
    const user = await User.findOne({_id, password: oldPassword})
    if(!user){
        return res.status(404).json({msg: "invalid old password"})
    }
    const hashedPass = bcrybt.hashSync(password, +process.env.SALT_ROUNDS)
    const updateUser = await User.findByIdAndUpdate(_id, {password: hashedPass})
    if (!updateUser) return res.status(404).json({msg: "update failed"})
    res.status(200).json({ message: 'done', updateUser })
}
// ====================display accounts connected with a recovery email=======================//
export const recoveryEmail = async(req, res, next)=>{
    const {recoveryEmail} = req.body
    if (!recoveryEmail){
        return res.status(400).json({msg: "please enter the email"})
    }
    const email = await User.find({recoveryEmail}).select('-password -_id -createdAt -updatedAt -__v')
    if(!email.length){
        return res.status(400).json({msg: "no accounts associated to this email"})
    }
    res.status(200).json({email})
}
// =======================ask for favColor of user to get his token========================//
export const getToken = async(req, res, nxet)=>{
    const{favColor, email, mobileNumber} = req.body
    if(!email && !mobileNumber){
        return res.status(404).json({msg: "please enter your data"})
    }
    const user = await User.findOne({
        $or: [
            {email},
            {mobileNumber}
        ], favColor
    }).select('otp -_id')
    if(!user){
        return res.status(400).json({msg: "your data is not right"})
    }
    res.status(200).json({msg: "here you are your otp", user})
}

// ===============if he answer right with his favColor he will get his otp in response============//
export const forgetPass = async (req, res, next)=>{
    const {otp, password} = req.body
    const hashPassword = bcrybt.hashSync(password, +process.env.SALT_ROUNDS)
    const user = await User.findOneAndUpdate({otp}, {password:hashPassword})
    if(!user){
        return res.status(400).json({msg: "invalid otp"})
    }
    res.status(200).json({msg: "done"})
} 