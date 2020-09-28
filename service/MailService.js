var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tugaskusatu@gmail.com',
        pass: 'nyrejieplavppaak'
    }
});

var mailOptions = {
    from: 'tugaskusatu@gmail.com',
    to: 'safriansah@usahakreatif.co.id',
    subject: 'Sending Email using Nodejs',
    html: '<h1>Welcome</h1><p>That was easy!</p>',
    attachments: [
        {
            filename: 'text1.txt',
            content: 'hello world!'
        }
    ]
};

exports.sendMail = async function sendMail(data){
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}