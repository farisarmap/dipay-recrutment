const pool = require("../config/connection")

module.exports = {
	createNote: (payload) => {
		return new Promise((resolve, reject) => {
			console.log(payload)
			const { title, description, user_id } = payload
			console.log(title, description, user_id)
			const qs = `INSERT INTO notes("title", "description", "createdAt", "updatedAt", "user_id") 
            VALUES('${title}', '${description}','${new Date()}', '${new Date()}', '${user_id}') RETURNING *`
			pool.query(qs, (err, result) => {
				if (err) reject(error)
				else {
					const noteId = result.rows[0].id
					resolve({
						status: 201,
						response: {
							status: "Success",
							noteId,
						},
					})
				}
			})
		})
	},
	getNote: () => {
		return new Promise((resolve, reject) => {
			const qs = `SELECT * FROM "notes"`
			pool.query(qs, (err, notes) => {
				if (err) reject(error)
				else {
					const allNote = notes.rows
					resolve({
						status: 200,
						response: { status: "Success", note: allNote },
					})
				}
			})
		})
	},
	getNoteById: (id) => {
		return new Promise((resolve, reject) => {
			const qs = `SELECT * FROM "notes" WHERE id='${id}'`
			pool.query(qs, (err, result) => {
				if (err) reject(error)
				else {
					const note = result.rows[0]
					resolve({
						status: 200,
						response: { status: "Success", note },
					})
				}
			})
		})
	},
	updateNote: (id, payload) => {
		return new Promise((resolve, reject) => {
			const { title, description } = payload
			const qs = `UPDATE "notes" SET "title"='${title}', "description"='${description}', "updatedAt"='${new Date()}' WHERE id='${id}' RETURNING *`
			pool.query(qs, (err, result) => {
				if (err) reject(error)
				else {
					const note = result.rows[0]
					resolve({
						status: 200,
						response: {
							status: "Success",
							note,
						},
					})
				}
			})
		})
	},
	deleteNote: (id) => {
		return new Promise((resolve, reject) => {
			const qs = `DELETE FROM "notes" WHERE id='${id}'`
			pool.query(qs, (err, result) => {
				if (err) reject(error)
				else {
					resolve({
						status: 200,
						response: {
							status: "Success",
							message: "Success delete note",
						},
					})
				}
			})
		})
	},
}
