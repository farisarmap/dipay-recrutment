const Note = require("../models/note.models")
module.exports = {
	create: async (req, res) => {
		try {
			const user_id = req.user.id
			const { body } = req
			const payload = {
				...body,
				user_id,
			}
			const createNote = await Note.createNote(payload)
			res.status(createNote.status).json(createNote.response)
		} catch (error) {
			next(error)
		}
	},
	getAll: async (req, res) => {
		try {
			const listNotes = await Note.getNote()
			res.status(listNotes.status).json(listNotes.response)
		} catch (error) {
			next(error)
		}
	},
	getById: async (req, res) => {
		try {
			const { id } = req.params
			const noteById = await Note.getNoteById(+id)
			res.status(noteById.status).json(noteById.response)
		} catch (error) {
			next(error)
		}
	},
	updateNote: async (req, res) => {
		try {
			const { body } = req
			const { id } = req.params
			const updateNote = await Note.updateNote(+id, body)
			res.status(updateNote.status).json(updateNote.response)
		} catch (error) {
			next(error)
		}
	},
	deleteNote: async (req, res) => {
		try {
			const { id } = req.params
			const removeNote = await Note.deleteNote(+id)
			res.status(removeNote.status).json(removeNote.response)
		} catch (error) {
			next(error)
		}
	},
}
