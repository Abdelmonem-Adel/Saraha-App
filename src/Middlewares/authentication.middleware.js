import { VerifyToken } from "../Utils/tokens.utils.js"
import User from "../DB/Models/users.model.js"
import blackList from "../DB/Models/black.list.tokens.model.js"

export const authenticationMiddleware = async (req , res , next)=> {

    const {accesstoken} = req.headers

    if (!accesstoken) {
        return res.status(400).json({message : "Please Provide accesstoken"})
    }

    const deCodeData = VerifyToken (accesstoken ,process.env.JWT_ACCESS_SECRET)
    
    if (!deCodeData.jti) {
        
        return res.status(401).json({message : "Invalid Token"})
    }


    const blackListedToken =await blackList.findOne({tokenId: deCodeData.jti})
    if(blackListedToken) {
        return res.status(400).json({message : "Token Is BlackListed"})
    }

    const user =await User.findById(deCodeData?._id)
    if(!user) {
         return res.status(401).json({message : "User Not Found"})
    }


    req.loggedInUser = user
    next()

}