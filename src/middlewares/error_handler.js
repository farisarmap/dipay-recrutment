function errorHandler(err, req, res, next) {
	if (err.name === "Unauthorized") {
		let message = err.message || "Authorization error"
		res.status(401).json({ message: message })
	} else if (err.name === "Bad Request") {
		res.status(400).json({ message: err.message })
	} else if (err.name === "Not Found") {
		res.status(404).json({ message: err.message })
	} else {
		let message = err.message || "internal server error"
		res.status(500).json({ message: message })
	}
}

module.exports = errorHandler
