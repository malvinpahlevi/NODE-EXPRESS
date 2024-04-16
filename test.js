const { sendMailSMTPSvc } = require('../smtp/smtp-mailtrap');
const fs = require('fs');
const parentFolder = require('path').resolve(__dirname, '..');
const ftp = require("basic-ftp") 

async function main() {

	// console.log("SMTP Service : " + await sendMailSMTPSvc(
	// 	`No-Reply <automail@gmail.com>`,
	// 	`Malvin Pahlevi <malvinfrog@gmail.com>`,
	// 	`malvinpahlevi@gmail.com`,
	// 	``,
	// 	`Nodemailer is unicode friendly ✔`,
	// 	`Hello to myself!`,
	// 	``,
	// 	``));

	console.log(parentFolder);

	const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "172.43.1.150",
            user: "sd",
            password: "Rasuna234!",
            secure: false
        })

		client.trackProgress(info => {
			console.log("File", info.name)
			console.log("Type", info.type)
			console.log("Transferred", info.bytes)
			console.log("Transferred Overall", info.bytesOverall)
		})

		// console.log(await client.list())
		await client.ensureDir("Alfresco/CLICS/FAKULTATIF_DEV")
		await client.clearWorkingDir()
		await client.uploadFromDir(parentFolder + "/unit-test", "Alfresco/CLICS/FAKULTATIF_DEV")
		await client.downloadToDir(parentFolder, "Alfresco/CLICS/FAKULTATIF_DEV")
        
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

main().catch(console.error);
