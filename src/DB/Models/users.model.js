import mongoose, { set } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String ,
            required : true ,
            lowercase : true ,
            trim : true ,
            minLength : [ 3 , "Name mast at least 3 Care"] ,
            maxLength : 25
        },

        lastName : {
            type : String ,
            required : true ,
            lowercase : true ,
            trim : true ,
            minLength : [ 3 , "Name mast at least 3 Care"] ,
            maxLength : 25
        },

        age : {
            type : Number ,
            required  : true ,
            min  : [ 18 , "the min age is 18 "],
            max : [ 100 , "the max age is 100"]
        },

        phoneNumber : {
            type : String ,
            required : true
        }, 

        gender : {
            type : String ,
            enum :["male" , "female"],
            default : "male"
        },

        email : {
            type : String ,
            index : {
                unique : true ,
                name : "idx_email"
            }
        },

        password : {
            type : String ,
            required : true
        },

        otps : {
            confirmation : String ,
            resetPassword : String
        },

        isConfirmed : {
            type : Boolean , 
            default : false
        }

    } ,

    {
        timestamps : true ,
        
        toJSON : {
            virtuals : true
        }, 

        toObject : {
            virtuals : true
        },

        virtuals : {
            fullName : {
                get() {
                    return `${this.firstName} ${this.lastName}`
                }
            }
        } ,

        methods : {
            getFullName() {

                return `${this.firstName} ${this.lastName}` 
            }
        }
    }
)

userSchema.index({firstName : 1 , lastName : 1} , {name : "idx_first_last_unique" , unique : true})

userSchema.virtual("Messages" , {
    ref : "message",
    localField : "_id",
    foreignField : "receiverId"
})


const User = mongoose.model("user" , userSchema)

export default User;