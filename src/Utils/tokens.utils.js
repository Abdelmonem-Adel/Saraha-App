import jwt from "jsonwebtoken"


export const GenerateToken = (payload , secret , options) => {

    return jwt.sign(payload , secret , options)
}





export const VerifyToken = (token , secret) => {

    return jwt.verify(token , secret)

}