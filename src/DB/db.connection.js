import mongoose from "mongoose";


const dbConnection = async ()=> {
    try {
        await mongoose.connect(process.env.DB_URL_LOCAL)
        console.log("DB Connection Successfully")
    } catch (error) {

        console.log("DB Not Connection" , error)
        
    }
}


export default dbConnection; 