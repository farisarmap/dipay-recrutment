const { verifyToken } = require("../helpers/jwt")
const User = require("../models/user.model")

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.token
		const decodedToken = verifyToken(token)
		const findUser = await User.findByUsername(decodedToken.userName)
		if (!findUser) {
			next({ name: "Unauthorized" })
		} else {
			req.user = findUser
			next()
		}
	} catch (error) {
		next(error)
	}
}
