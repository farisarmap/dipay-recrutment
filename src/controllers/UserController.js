const User = require("../models/user.model")

module.exports = {
	register: async (req, res, next) => {
		try {
			const { body } = req
			const createUser = await User.register(body)
			res.status(createUser.status).json({
				msg: createUser.message,
				userId: createUser.userId,
			})
		} catch (error) {
			next(error)
		}
	},
	login: async (req, res, next) => {
		try {
			const { body } = req
			const loginUser = await User.login(body)
			res.status(loginUser.status).json(loginUser.response)
		} catch (error) {
			next(error)
		}
	},
	refreshToken: async (req, res, next) => {
		try {
			const { body } = req
			const updateToken = await User.refreshToken(body)
			res.status(updateToken.status).json(updateToken.response)
		} catch (error) {
			next(error)
		}
	},
	logout: async (req, res, next) => {
		try {
			const { body } = req
			const deleteToken = await User.deleteToken(body)
			res.status(deleteToken.status).json(deleteToken.response)
		} catch (error) {
			next(error)
		}
	},
}
