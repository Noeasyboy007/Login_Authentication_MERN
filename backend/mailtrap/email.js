const { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } = require("./emailTemplates");
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
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Verification email sent", error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
}

const sendWelcomemail = async (email, name) => {
    const recipient = [{ email }]
    try {
        await mailtrapClient.send({
            from: Sender,
            to: recipient,
            subject: "Welcome to our website",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: "Welcome Email"
        })
        console.log("Welcome email sent successfully");
    } catch (error) {
        console.error("Verification email sent", error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
}
module.exports = { sendVerificationmail, sendWelcomemail }