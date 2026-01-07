const nodemailer = require("nodemailer")
import env from "./validateEnv"
const sendEmail = async (email: string, generatedOTP: number): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: "Gmail",
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS,
            },
        })
        let mailOptions = {
            from: env.EMAIL_USER,
            to: email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + generatedOTP + "</h1>",
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error(error)
    }
}

export default sendEmail
