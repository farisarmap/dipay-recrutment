const Note = require("../models/note.models")
const HttpException = require("../utils/httpException")

module.exports = {
	create: async (req, res, next) => {
		try {
			const user_id = req.user.id
			const { body } = req
			const payload = {
				...body,
				user_id,
			}
			const createNote = await Note.createNote(payload)
			if (!createNote) {
				throw new HttpException(500, "Something went wrong")
			}
			res.status(201).json({
				status: "Success",
				data: { noteId: createNote.user.id },
			})
		} catch (error) {
			next(error)
		}
	},
	getAll: async (req, res, next) => {
		try {
			const listNotes = await Note.getNote()
			if (!listNotes) {
				throw new HttpException(500, "Something went wrong")
			}
			res.status(200).json({
				status: "Success",
				data: {
					notes: listNotes.note,
				},
			})
		} catch (error) {
			next(error)
		}
	},
	getById: async (req, res, next) => {
		try {
			const { id } = req.params
			const noteById = await Note.getNoteById(+id)
			if (!noteById) {
				throw new HttpException(500, "Something went wrong")
			}
			res.status(200).json({ status: "Success", note: noteById.payload })
		} catch (error) {
			next(error)
		}
	},
	updateNote: async (req, res, next) => {
		try {
			const { body } = req
			const { id } = req.params
			const updateNote = await Note.updateNote(+id, body)
			if (!updateNote) {
				throw new HttpException(500, "Something went wrong")
			}
			res.status(200).json({
				status: "Success",
				data: { note: updateNote.data },
			})
		} catch (error) {
			next(error)
		}
	},
	deleteNote: async (req, res, next) => {
		try {
			const { id } = req.params
			const removeNote = await Note.deleteNote(+id)
			if (!removeNote) {
				throw new HttpException(500, "Something went wrong")
			}
			res.status(removeNote.status).json(removeNote.response)
		} catch (error) {
			next(error)
		}
	},
}
