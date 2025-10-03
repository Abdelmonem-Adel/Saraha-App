
import { json } from "express"
import User from "../../../DB/Models/users.model.js"
import { Decrypt, Encrypt } from "../../../Utils/encryption.utils.js"
import { compareSync, hash, hashSync } from "bcrypt"
import { emitter, SendEmail } from "../../../Utils/send-email.utils.js"
import { customAlphabet } from "nanoid"
import {v4 as uuidv4} from "uuid"
import { GenerateToken, VerifyToken } from "../../../Utils/tokens.utils.js"
import blackList from "../../../DB/Models/black.list.tokens.model.js"

const randomId = customAlphabet('123456789abcdefgh' , 8)

export const SignUpService = async (req , res)=> {

try {

    const{firstName , lastName , email , password , phoneNumber ,  age , gender} = req.body 

    const emailExist = await User.findOne(
        {
            $or : [
                {email} , {firstName , lastName}
            ]
        }
    )

    if (emailExist) {

        return res.status(409).json({message :"User already Exist"})
    }

        const encryptedPoneNumber = Encrypt(phoneNumber)
        
        const hashingPassword = hashSync(password , +process.env.SLAT_ROUND)

        const otp = randomId()

        const user = await User.create({firstName , lastName , email , password:hashingPassword, otps : {confirmation:hashSync(otp , 10)} , phoneNumber:encryptedPoneNumber  , age , gender})
        
        

        emitter.emit('SendEmail' , {
            to : email,
            subject : "test",
            content : `<h1>Your Confirmation OTP Is : ${otp}</h1>`
        } )
       
        return res.status(201).json({message :"User created Successfully" , user})

    
} catch (error) {
    console.log(error)
    return res.status(500).json({message :"User Not created" , error})
    
}

}


export const ConfirmOtp = async (req , res)=> {

    const {email , otps} = req.body 

    const user = await User.findOne({email , isConfirmed: false})

    if (!user) {
        res.status(400).json({massage:'user not found or already confirmed'}) 
    }

    const confirmation = compareSync(otps , user.otps?.confirmation)

    if (!confirmation) {
        res.status(400).json({massage:'OTP Not Valid'})
    } else {
        user.isConfirmed = true
        user.otps.confirmation = undefined
    }

    // user.isConfirmed = true
    // user.otps.confirmation = undefined

    await user.save()

    res.status(200).json({massage : 'confirmed'})

} 



export const SignInService = async (req , res)=> {


        const {email , password } = req.body

        const user =  await User.findOne({email})

        if (!user) {

            res.status(404).json({massage:"email or pass is Not found"})
        }

        const IsPassMatch = compareSync(password , user.password)
        if (!IsPassMatch) {
            
          return  res.status(404).json({massage:"email or pass is Not found"})
        } 

        const AccessToken = GenerateToken(

            {_id : user._id , email : user.email} , 
            process.env.JWT_ACCESS_SECRET ,
            {
                expiresIn :  process.env.JWT_ACCESS_EXPIRES_IN  ,
                jwtid : uuidv4()

            }

        )


        const RefreshToken = GenerateToken(

            {_id : user._id , email : user.email} , 
            process.env.JWT_REFRESH_SECRET ,
            {
                expiresIn :  process.env.JWT_REFRESH_EXPIRES_IN  ,
                jwtid : uuidv4()

            }

        )
            

        return res.status(200).json({massage:"User SignIn Successfully" , AccessToken , RefreshToken})

}



export const UpdateAccountService = async (req, res) => {
  try {

   

    const{_id} = req.loggedInUser

    const { firstName, lastName, email, phoneNumber, age, gender } = req.body;

    const user = await User.findByIdAndUpdate(
      _id,
      { firstName, lastName, email, phoneNumber, age, gender },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User Is Not Found" });
    }

    return res.status(201).json({ message: "User Updated Successfully", user });

  } catch (error) {
    return res.status(500).json({ message: "User Not Updated", error });
  }
};



export const DeleteAccountService = async (req , res)=> {

    try {

        const{_id} = req.loggedInUser

        const deletedResult = await User.deleteOne({_id})

        if (!deletedResult.deletedCount) {

            return res.status(404).json({message :"User Is Not Found"})
        }

        return res.status(201).json({message :"User Deleted Successfully"})
        
    } catch (error) {
        return res.status(500).json({message :"User Not Deleted" , error})
    }

}




export const ListUserService = async (req , res)=> {

    let users = await User.find()

    users = users.map((user)=> {
        


        return {
            ...user._doc,
            phoneNumber : Decrypt(user.phoneNumber)
        }
    })

    res.status(200).json(users)
    
}



export const ListUserMessagesService = async (req , res)=> {

    const{id} = req.params

    let users = await User.findById(id).populate("Messages")

    res.status(200).json({users})

}




export const LogOutService = async (req , res)=> {
    
    const {accesstoken} = req.headers;
    const deCodeData = VerifyToken(accesstoken, process.env.JWT_ACCESS_SECRET);

    const expirationDate = new Date(deCodeData.exp * 1000)

    await blackList.create(
        {
            tokenId : deCodeData.jti,
            expirationDate
        }
    )

    return res.status(200).json({massage: "User LogOut suc"})

}




export const RefreshTokenService = async (req , res)=> {

    const {refreshtoken} = req.headers

    const deCodeData = VerifyToken(refreshtoken , process.env.JWT_REFRESH_SECRET)

    const AccessToken = GenerateToken(

            {_id : deCodeData._id , email : deCodeData.email} , 
            process.env.JWT_ACCESS_SECRET ,
            {
                expiresIn :  process.env.JWT_ACCESS_EXPIRES_IN  ,
                jwtid : uuidv4()

            }

        )

        return res.status(200).json({massage:"User Token Is Refreshed Successfully" , AccessToken})

}