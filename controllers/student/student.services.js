const { validationResult } = require("express-validator");

const response = require("../../utility/response");
const cache = require("../../utility/cache-provider");
const { createLog } = require("../../utility/create-log");
const { poolPromise } = require("../../database/data-access")
const { routerValidationResult } = require("../../utility/router-val");

async function submitStudentSvc(spCallName, req, res) {
	try {

		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const age = req.body.age;
		const sex = req.body.sex;
		const studentId = '';

		const query = `CALL INS_STUDENT (?,?,?,?,?,@status,@result)`;

		const [rows, fields] = await poolPromise.execute(query, [studentId, firstName, lastName, age, sex]);
		const [results] = await poolPromise.execute('SELECT @status AS status, @result AS result');

		const status = results[0].status;
		const result = results[0].result;

		if (status === "00") {
			response.done(status, result, res)
		} else {
			response.badRequest(result, res);
		}
	} catch (error) {
		await createLog(error, "submitStudentSvc");
		response.error(error, res);
	}
}

async function getStudentSvc(spCallName, req, res) {
	try {

		const query = `SELECT StudentID, FirstName, LastName, Age, Sex FROM student ORDER BY StudentID LIMIT 1`;

		const [rows, fields] = await poolPromise.execute(query);

		// const data = {
		// 	name : 'Daniel',
		// 	donate : 500000,
		// 	phone : '0812321312132'
		// }
		
		// if (rows.length !== 0) {
		if (1 > 0) {

			response.ok("00", "Success", rows, res)
		} else {
			response.okNotFound(res);
		}
	} catch (error) {
		await createLog(error, "getStudentSvc");
		response.error(error, res);
	}
}

async function getStudentByName(req, res) {
	try {
		const name = req.params.name;
		
		const query = `SELECT StudentID, FirstName, LastName, Age, Sex FROM student WHERE FirstName = ? `;
		
		const [rows, fields] = await poolPromise.execute(query, [name]);
		
		// if (rows.length !== 0) {
		if (1 > 0) {
			response.ok("00", "Success", rows, res)
		} else {
			response.okNotFound(res);
		}
	} catch (error) {
		await createLog(error, "getStudentByName");
		response.error(error, res);
	}
}

async function getStudentByAge(req, res) {
	try {
		const getRouterValErr = await routerValidationResult(
      validationResult(req),
      res
    );

		if (!getRouterValErr){
			const firstName = req.body.firstName;
			const age = req.body.age;
			
			const query = `SELECT StudentID, FirstName, LastName, Age, Sex FROM student WHERE FirstName LIKE ? AND Age = ?`;
			
			const [rows, fields] = await poolPromise.execute(query, [`%${firstName}%`,age]);
			
			// if (rows.length !== 0) {
			if (1 > 0) {
				response.ok("00", "Success", rows, res)
			} else {
				response.okNotFound(res);
			}
		} 
	} catch (error) {
		await createLog(error, "getStudentByName");
		response.error(error, res);
	}
}

module.exports = {
	submitStudentSvc,
	getStudentSvc,
	getStudentByName,
	getStudentByAge
};
