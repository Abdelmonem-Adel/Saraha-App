import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    content : {
        type :String ,
        required : true
    },

    receiverId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user"
    }
},

{
    timestamps : true
})

const Messages = mongoose.model("message" , messagesSchema)

export default Messages