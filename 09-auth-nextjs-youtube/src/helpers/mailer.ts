import nodemailer from 'nodemailer';
import User from '@/model/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        //create a hashed token 
        const hashedtoken = await bcryptjs.hash(userId.toString(), 10)
        
       if(emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId,
            {verifyToken: hashedtoken, verifyTokenExpiry: Date.now() + 3600000}
        )
       } else if (emailType ==="FORGET") {
        await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedtoken, forgotPasswordTokenExpiry: Date.now() + 3600000}
        )
       }

       const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      let info = await transporter.sendMail({
        from: `${process.env.MAIL_USER}`,
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "RESET your password", 
        html:`<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${emailType === "VERIFY" ? "verify your email" :
         "reset your password"} 
         or copy and paste the link below in you browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedtoken} 
         </p>`
      })


    } catch(error:any) {

    }
}