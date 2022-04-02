const path = require("path")
const winston = require("winston")

const options = {
	file: {
		level: "info",
		filename: path.resolve("logs", "app.log"),
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorsize: false,
	},
	console: {
		level: "debug",
		handleExceptions: true,
		json: false,
		colorize: true,
	},
}

const logger = winston.createLogger({
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console),
	],
	format: winston.format.combine(
		winston.format.timestamp({
			format: "MMM-DD-YYYY HH:mm:ss",
		}),
		winston.format.printf(
			(info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
		)
	),
	exitOnError: false,
})

logger.stream = {
	write: function (message, encoding) {
		logger.info(message)
	},
}

module.exports = logger
