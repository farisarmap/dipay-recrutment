const { verifyToken } = require("../helpers/jwt")
const User = require("../models/user.model")
const Note = require("../models/note.models")

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.token
		if (token) {
			const decodedToken = verifyToken(token)
			const findUser = await User.findByUsername(decodedToken.userName)
			if (!findUser) {
				next({ status: 401, message: "Unautorized" })
			} else {
				const { id } = req.params
				const findNoteById = await Note.getNoteAuthId(+id)
				if (findUser.id !== findNoteById.note.user_id) {
					next({ status: 403, message: "This user dont have access" })
				} else if (findUser.id === findNoteById.note.user_id) {
					next()
				}
			}
		} else if (!token) {
			next({ status: 401, message: "token invalid" })
		}
	} catch (error) {
		next({
			status: 401,
			message: "Something went wrong with your authentication",
		})
	}
}
