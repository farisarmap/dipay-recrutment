const { verifyToken } = require("../helpers/jwt")
const User = require("../models/user.model")

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.token
		if (token) {
			const decodedToken = verifyToken(token)
			const findUser = await User.findByUsername(decodedToken.userName)
			if (!findUser) {
				res.status(401).json({ message: "User not found!" })
			} else {
				req.user = findUser
				next()
			}
		} else if (!token) {
			res.status(401).json({ message: "Invalid token!" })
		}
	} catch (error) {
		res.status(401).json({ message: "Unauthorized!" })
	}
}
