const nodemailer = require('nodemailer')
const config = require('../config/config')


 async function sendMail (sub,html){
    try {
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, 
            secure: false,
            auth: {
                user: config.email.email, 
                pass: config.email.pass, 
            },
        });
    
        const info = await transporter.sendMail({
            from: config.email.email,
            to: 'jayshree.webappdev@gmail.com',
            subject: sub,
            html: html,
            
        });
    
        console.log('message sent:', info.messageId);
        return true  
    } catch (error) {
        console.log(error);
        return false
    }
    
};

module.exports = { sendMail };
