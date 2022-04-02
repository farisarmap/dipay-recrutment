const winston = require("../logger")

module.exports = async (err, req, res, next) => {
	let status = err.status || 500
	let message = err.message || "Internal Server Error"

	winston.error(
		`${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
	)

	res.status(status).json({ message })
}
