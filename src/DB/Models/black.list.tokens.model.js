import mongoose from "mongoose";


const blackListSchema = new mongoose.Schema (
    {
        
            tokenId : {type : String , required : true , unique : true},
            expirationDate : {type : Date , required : true }
        
    }
)

const blackList = mongoose.model("blackList" , blackListSchema)

export default blackList;