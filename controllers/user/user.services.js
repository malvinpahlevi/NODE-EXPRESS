const response = require("../../utility/response");
const cache = require("../../utility/cache-provider");
const { createLog } = require("../../utility/create-log");
const { poolPromise } = require("../../database/data-access");
let crypto = require('../../utility/crypto');

async function submitUserSvc(spCallName, req, res) {
	try {

		const email = req.body.email;
		const password = req.body.password;
		const name = req.body.name;
		const phone = req.body.phone;
		const username = req.body.username;

		const hashPassword = crypto.encryptPassword(password);

		const query = `CALL INS_USER (?,?,?,?,?,@status,@result)`;

		const [rows, fields] = await poolPromise.execute(query, [email, hashPassword, name, phone, username]);
		const [results] = await poolPromise.execute('SELECT @status AS status, @result AS result');

		const status = results[0].status;
		const result = results[0].result;

		if (status === "00") {
			response.done(status, result, res)
		} else {
			response.badRequest(result, res);
		}
	} catch (error) {
		await createLog(error, "submitUserSvc");
		response.error(error, res);
	}
}

async function getUserSvc(spCallName, req, res) {
	try {

		const query = `SELECT 
							ID
							, Email
							, Password
							, Name
							, Phone
							, CASE WHEN Status = 1 THEN 'ACTIVE' ELSE 'DEACTIVE' END AS Status
							, InputUser
							, DATE_FORMAT(InputDate, '%Y-%m-%d') AS InputDate
						FROM user ORDER BY ID`;

		const [rows, fields] = await poolPromise.execute(query);

		if (rows.length !== 0) {

			response.ok("00", "Success", rows, res)
		} else {
			response.okNotFound(res);
		}
	} catch (error) {
		await createLog(error, "getStudentSvc");
		response.error(error, res);
	}
}

module.exports = {
	submitUserSvc,
	getUserSvc
};
