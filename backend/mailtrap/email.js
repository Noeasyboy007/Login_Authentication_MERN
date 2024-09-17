const {
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE
} = require("./emailTemplates");
const { mailtrapClient, Sender } = require("./mailtrap.config");

const sendVerificationmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        await mailtrapClient.send({
            from: Sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Verification email sent successfully :- 1");
    } catch (error) {
        console.error("error to send Verification email .", error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};

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
        console.log("Welcome email sent successfully :- 3");
    } catch (error) {
        console.error("Verification email sent", error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};

const sendResetPasswordEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        await mailtrapClient.send({
            from: Sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
    } catch (error) {
        console.error('Error sending password reset email', error);
        throw new Error('Could not send reset password email', error);
    }
};

const sendResetSuccessfulEmail = async (email) => {
    const recipient = [{ email }];

    try {
        await mailtrapClient.send({
            from: Sender,
            to: recipient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Successful"
        });
        console.log("Reset password Success email sent successfully :- 8");

    } catch (error) {
        console.error("Could not send reset password email", error);
        res.status(500).json({ success: "false", message: error.message });
    }
};
module.exports = { sendVerificationmail, sendWelcomemail, sendResetPasswordEmail, sendResetSuccessfulEmail };