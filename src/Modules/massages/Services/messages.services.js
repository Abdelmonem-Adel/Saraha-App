import Messages from "../../../DB/Models/messages.model.js";
import User from "../../../DB/Models/users.model.js";



export const sendMessagesServices = async (req , res)=> {
    const {content} = req.body
    const {receiverid} = req.params

    const user = await User.findById(receiverid)
    if(!user) {
        res.status(400).json({message:"User Is Not Found"})
    }

    const message = new Messages({
        content,
        receiverid
    })
    await message.save()

    res.status(200).json({message:"Message Send Successfully"})
}



export const getMessagesServices = async (req , res)=> {

    const messages = await Messages.find().populate({
  path: "receiverId",
  select: "firstName lastName",
});



    return res.status(200).json({messages})

}