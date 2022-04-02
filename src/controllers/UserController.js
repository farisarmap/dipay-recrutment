const User = require("../models/user.model")
const HttpException = require("../utils/httpException")

module.exports = {
	register: async (req, res, next) => {
		try {
			const { body } = req
			const createUser = await User.register(body)
			res.status(201).json({
				status: "Success",
				userId: createUser.user.id,
			})
		} catch (error) {
			next(error)
		}
	},
	login: async (req, res, next) => {
		try {
			const { body } = req
			const loginUser = await User.login(body)
			if (!loginUser) {
				throw new HttpException(500, "Something went wrong")
			}
			res.status(201).json({
				status: "Success",
				data: {
					accessToken: loginUser.token,
					refreshToken: loginUser.refreshToken,
				},
			})
		} catch (error) {
			next(error)
		}
	},
	refreshToken: async (req, res, next) => {
		try {
			const { body } = req
			const updateToken = await User.refreshToken(body)
			if (!updateToken) {
				throw new HttpException(500, "Something went wrong")
			}
			res.status(200).json({
				status: "Success",
				data: {
					accessToken: updateToken.token,
				},
			})
		} catch (error) {
			next(error)
		}
	},
	logout: async (req, res, next) => {
		try {
			const { body } = req
			const deleteToken = await User.deleteToken(body)
			if (!deleteToken) {
				throw new HttpException(500, "Something went wrong")
			}
			res.status(200).json({ message: "Success" })
		} catch (error) {
			next(error)
		}
	},
}
