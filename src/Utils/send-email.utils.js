import nodemailer from "nodemailer"

export const SendEmail = async (
  {
    to,
    cc = "abdelmonema37@gmail.com",
    subject,
    content

  }

)=> {

    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, 
    secure: true, 
    auth: {
        user: "abdelmonemadel9@gmail.com",
        pass: process.env.USER_PASSWORD,
  },

  tls: {
  rejectUnauthorized: false
}
  
});




  const info = await transporter.sendMail({
    from: 'abdelmonemadel9@gmail.com',
    to ,
    cc,
    subject,
    html:content,
  });

  // console.log("Message sent:", info);


return info

}


import { EventEmitter } from "node:events";

export const emitter = new EventEmitter ;

emitter.on('SendEmail' , (arg)=> {
        
        SendEmail(arg)
})