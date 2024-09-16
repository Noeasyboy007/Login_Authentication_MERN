const dotenv = require('dotenv');
dotenv.config();

const { MailtrapClient } = require("mailtrap");


const mailtrapClient = new MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT,
    token: process.env.MAILTRAP_TOKEN,
});

const mailtrapSender = {
    email: "mailtrap@demomailtrap.com",
    name: "Aritra bera",
};

// const recipients = [
//     {
//         email: "aritrabera67@gmail.com",
//     }
// ];

// client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         html: "Congrats for sending test email with Mailtrap!",
//         category: "Integration Test",
//     })
//     .then(console.log, console.error);


module.exports = { mailtrapClient, mailtrapSender }