import { Resend } from "resend"
import env from "./validateEnv"

const resend = new Resend(env.RESEND_API_KEY)

const sendEmail = async (email: string, generatedOTP: number): Promise<void> => {
    try {
        await resend.emails.send({
            from: env.RESEND_FROM,
            to: email,
            subject: "OTP for registration",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + generatedOTP + "</h1>",
        })
    } catch (error) {
        console.error(error)
    }
}

export default sendEmail
