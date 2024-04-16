const expressWinston 			= require('express-winston');
const { transports, format } 	= require('winston');
const DailyRotateFile 			= require('winston-daily-rotate-file');
const fs 											= require('fs');

const folderName = 'C:/logs/' + process.env.MS_NAME + '_NODEJS';
try {
	if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName);
	}
} catch (err) {
	console.error(err);
}

const winstonLogger = () => {
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
  return expressWinston.logger({
		transports: [
			// new transports.File({ filename: 'combined.log' }),
			new DailyRotateFile({
				dirname: folderName,
				filename: process.env.MS_NAME + '_%DATE%.log',
				datePattern: 'YYYY-MM-DD',
				zippedArchive: true,
				maxSize: '5m', // Max size per file (5 MB)
				maxFiles: '14d', // Retain logs for 14 days
			}),
			// new transports.Console()
		],
		format: format.combine(
			// format.simple(),
			format.json(),
			format.timestamp(),
			format.prettyPrint(),
			format.splat(),
		)
	});
};

module.exports = winstonLogger;