import  jwt  from "jsonwebtoken";
import User from "../../DB/models/user.model.js";

export const auth = (accessRoles) => { 
    return async(req, res, next) => {
        try {
            const {accesstoken} = req.headers
            if(!accesstoken){
                return res.status(400).json({msg: "please sign in first"})
            }
            if(!accesstoken.startsWith("jobsearchtoken_")){
                return res.status(400).json({msg: "invalid token prefix"})
            }
            const token = accesstoken.split("jobsearchtoken_")[1]
            const decodedToken = jwt.verify(token, "jobsearchtoken_")
            if(!decodedToken || !decodedToken.id){
                return res.status(400).json({msg: "invalid token payload"})
            }
            const findUser = await User.findById(decodedToken.id)
            if(!findUser){
                return res.status(404).json({msg: "please signUp first"})
            }
            if (!accessRoles.includes(findUser.role)) return next(new Error('you are not allowed to access this route', { cause: 401 }))
            req.authUser = findUser
            next()
        }catch (error){
            res.status(500).json({msg: "catch error in auth middleware"})
        }
    }
}