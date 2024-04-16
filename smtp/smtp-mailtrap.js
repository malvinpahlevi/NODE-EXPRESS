const fs = require("fs");
const nodemailer = require('nodemailer');
const constants = require('../utility/constants');
const parentFolder = require('path').resolve(__dirname, '..');

async function sendMailSMTPSvc(from, sendTo, ccTo, bccTo, subject, text, htmlFormat, contentBody){
	let result = false;

	let transporter = nodemailer.createTransport({
		pool: true,
		host: "sandbox.smtp.mailtrap.io",
		port: 587,
		secure: false, // use TLS
		logger: false,
		auth: {
			user: "075cfce0f54b41",
			pass: "55e4140aa15bc4",
		},
	});

	let message = {
		from: from,
		to: sendTo,
		bcc: bccTo,
		subject: subject,
		text: text || '',
		html: htmlFormat || '' + constants.FOOTER_MAIL,
		attachments: [
			{
				filename: 'Logo.jpg',
				content: fs.createReadStream(parentFolder + '/assets/LogoMail.png'),
				cid: 'logo-ciputra'
			},
		],
		headers : {
			'Content-ID' : '<image>'
		},
	};

	return await transporter.sendMail(message, (error, info) => {
		if (error){
			result = false;
			console.log("Error : SMTP Service " + error.message);
		}else{
			result = true;
			console.log("Message sent: %s", info.messageId);
		}
	});
}



module.exports = {
	sendMailSMTPSvc,
};
