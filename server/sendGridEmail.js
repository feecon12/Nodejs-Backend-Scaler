const sgmail = require('@sendgrid/mail');
require('dotenv').config();
sgmail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'mail2fme22@gmail.com',
    from: 'mail2feeconbehera@gmail.com',    
    subject: 'Sending with SendGrid is Fun',    
    text: 'default message',
    html: '<h1>Welcome from Feecon</h1>',
};

sgmail.send(msg)
.then(() => {
    console.log('Email sent');
})
.catch((error) => {
    console.error(error);
});

