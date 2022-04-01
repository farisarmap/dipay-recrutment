const jwt = require("jsonwebtoken")
const JWT_SECRET = "SECRET"

const generateToken = (payload) => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
}

const verifyToken = (token) => {
	return jwt.verify(token, JWT_SECRET)
}

module.exports = {
	generateToken,
	verifyToken,
}
