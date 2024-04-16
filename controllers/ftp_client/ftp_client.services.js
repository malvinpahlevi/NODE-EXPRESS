const response = require("../../utility/response");
const { createLog } = require("../../utility/create-log");
const parentFolder = require('path').resolve(__dirname, '../../');

async function ftpUploadSvc(spCallName, req, res) {
	try {
		let sampleFile;
		let uploadPath;

		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send('No files were uploaded.');
		}
		sampleFile = req.files.sampleFile;
		uploadPath = parentFolder + '/assets/' + sampleFile.name;

    if (sampleFile.size > 10 * 1024 * 1024){
      return res.status(400).send('Oversize, maximum 10 Mb!');
    }
		console.log(sampleFile);

		// Use the mv() method to place the file somewhere on your server
		await sampleFile.mv(uploadPath, function(err) {
			if (err)
				return res.status(500).send(err);

			res.send('File uploaded!');
		});

	} catch (error) {
		await createLog(error, "ftpUploadSvc");
		response.error(error, res);
	}
}

module.exports = {
	ftpUploadSvc,
};
