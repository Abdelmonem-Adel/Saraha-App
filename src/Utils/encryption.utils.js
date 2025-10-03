import crypto from "node:crypto"
import { buffer } from "node:stream/consumers"

const ENCRYPTION_SECRET_KEY = Buffer.from(process.env.ENCRYPTION_SECRET_KEY)
const IV_LENGTH = +process.env.IV_LENGTH


export const Encrypt = (text)=> {

    const IV = crypto.randomBytes(IV_LENGTH)

    const cipher = crypto.createCipheriv('aes-256-cbc' , ENCRYPTION_SECRET_KEY , IV)

    let encrypt = cipher.update(text , "utf-8" , "hex")

    encrypt += cipher.final("hex") 

    return `${IV.toString("hex")} : ${encrypt}`

}




export const Decrypt = (encryptedData) => {

    const [IV , encryptedText] = encryptedData.split(" : ")

    const binaryLikeIV = Buffer.from(IV , "hex")

    const decipher = crypto.createDecipheriv('aes-256-cbc' , ENCRYPTION_SECRET_KEY , binaryLikeIV)

    let decrypt = decipher.update(encryptedText , "hex" , "utf-8")

    decrypt += decipher.final("utf-8")

    return decrypt
} 