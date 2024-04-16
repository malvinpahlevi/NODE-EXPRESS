const response = require("../../utility/response");
const cache = require("../../utility/cache-provider");
const { createLog } = require("../../utility/create-log");
const { poolPromise } = require("../../database/data-access");
var jwt = require('jsonwebtoken');
const crypto = require("crypto")
var moment = require("moment");
let util = require('../../utility/crypto');

async function loginSvc(spCallName, req, res) {
	try {
		const email = req.body.email;
		const plainPassword = req.body.password;

		const searchUsers = `SELECT Password, Name FROM user WHERE status = 1 AND email = ?`;

		const [resUsers, _fields] = await poolPromise.execute(searchUsers, [email]);

		// Cek users exits
		if (resUsers[0]){
			const hashPassword = resUsers[0].Password;
			const name = resUsers[0].Name;

			const isValid = util.decryptPassword(plainPassword, hashPassword); 

			// is password equals hashPassword match 
			if (isValid){
				const resToken = await generateTokenSvc(email, name);
				response.ok("00", "Success", resToken, res);
			}else{
				response.badRequest("Email or password incorrect!", res);
			}
		} else {
			response.badRequest("Email or password incorrect!", res);
		}

	} catch (error) {
		await createLog(error, "loginSvc");
		response.error(error, res);
	}
}

async function generateTokenSvc(email, name){
	try {
		let result;

		const token = jwt.sign({
			data: email
		}, process.env.AUTH_SECRET, {
			expiresIn: '30m',
			issuer: process.env.APP_NAME,
		});

		/* OTHER OPTIONS SAVE TOKEN TO DB
		const token = crypto.randomBytes(32).toString("hex");
		const tokenEncrypted = util.encrypt(token, process.env.AUTH_SECRET);

		let issuedAt = new Date();

		let expiredAt = new Date();
		expiredAt.setMinutes(expiredAt.getMinutes() + 30);

		// Delete user token if exists
		const q_deleteTokenUser = `DELETE FROM token WHERE email = ?`;
		const [resDelete, _fields] = await poolPromise.execute(q_deleteTokenUser, [email]);

		// Insert new token
		const q_insertToken = `INSERT INTO token (Email, Token, TokenRefresh, IssuedAt, ExpiredAt) VALUES (?,?,?,?,?)`;
		const [rows, _metaData] = await poolPromise.execute(q_insertToken, [email, tokenEncrypted, '', issuedAt, expiredAt]);*/

		result = {
			name : name,
			email : email,
			token : token,
			// issuedAt : `${moment(issuedAt).format("YYYY-MM-DDTHH:mm:ss")}`,
			// expiredAt : `${moment(expiredAt).format("YYYY-MM-DDTHH:mm:ss")}`,
		};

		return result;
		
	} catch (error) {
		await createLog(error, "generateTokenSvc");
	}
}

module.exports = {
	loginSvc,
};
