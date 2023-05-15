import node_mailer from 'nodemailer';
import mailgen from 'mailgen';

import config from '../config.js'; //for using so called secret and which will not be visible while uploading the project to github

let node_config = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: config.OTP_EMAIL,
        pass: config.OTP_PASSWORD
    }
}

let transporter = nodemailer.cerateTransport(node_config);

let mail_generator = new mailgen({
    theme: "default",
    product: {
        name: "mailgen",
        link: "https://mailgen.js/"
    }
});

export const register_mail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body; //getting the parameters from body of request

    var email = {
        body: {
            name: username,
            intro: text || 'welcome to our website! have fun',
            outro: 'Nobody is gonna help you dumbf**k, help yourselves!'
        }
    }

    var email_body = mail_generator.generate(email);

    let message = {
        from: config.OTP_EMAIL,
        to: userEmail,
        subject: subject || "signup successfull",
        html: email_body
    }

    //sending the mail part 
    transporter.sendMail(message).then(() => {
        return res.status(200).send({ msg: "An otp was sent to your registered e-mail." })
    }).catch(error => res.status(500).send({ error })) // in case of any error


}