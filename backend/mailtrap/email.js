const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates");
const { mailtrapClient, Sender } = require("./mailtrap.config");

const sendVerificationmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: Sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Verification email sent successfully", response);
    } catch (error) {
        console.error("Verification email sent", error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
}

const sendWelcomemail = async () => {

}
module.exports = { sendVerificationmail, sendWelcomemail }