const pool = require("../config/connection")

module.exports = {
	createNote: (payload) => {
		return new Promise((resolve, reject) => {
			const { title, description, user_id } = payload
			const qs = `INSERT INTO notes("title", "description", "createdAt", "updatedAt", "user_id") 
            VALUES('${title}', '${description}','${new Date()}', '${new Date()}', '${user_id}') RETURNING *`
			pool.query(qs, (err, result) => {
				if (err)
					reject({ status: 500, message: "Internal server error" })
				else {
					const note = result.rows[0]
					if (!note) {
						reject({ status: 400, message: "Bad Request!" })
					}
					resolve({
						user: note,
					})
				}
			})
		})
	},
	getNote: () => {
		return new Promise((resolve, reject) => {
			const qs = `SELECT * FROM "notes"`
			pool.query(qs, (err, notes) => {
				if (err)
					reject({ status: 500, message: "Internal server error" })
				else {
					const allNote = notes.rows
					if (!allNote) {
						reject({ status: 404, message: "Data not found" })
					} else {
						resolve({ note: allNote })
					}
				}
			})
		})
	},
	getNoteById: (id) => {
		return new Promise((resolve, reject) => {
			const qs = `SELECT n.id, n.title, n.description, u."userName" FROM notes as n JOIN users as u on n.user_id=u.id
			where n.id='${id}'`
			pool.query(qs, (err, result) => {
				if (err)
					reject({ status: 500, message: "Internal server error" })
				else {
					const note = result.rows[0]
					if (!note) {
						reject({ status: 404, message: "Data not found" })
					} else {
						const payload = {
							id: note.id,
							title: note.title,
							description: note.description,
							creator: note.userName,
						}
						resolve({ payload })
					}
				}
			})
		})
	},
	updateNote: (id, payload) => {
		return new Promise((resolve, reject) => {
			const { title, description } = payload
			const qs = `UPDATE "notes" SET "title"='${title}', "description"='${description}', "updatedAt"='${new Date()}' WHERE id='${id}' RETURNING *`
			pool.query(qs, (err, result) => {
				if (err)
					reject({ status: 500, message: "Internal server error" })
				else {
					const note = result.rows[0]
					if (!note) {
						reject({
							status: 406,
							message: "Something went wrong with update note",
						})
					} else if (note) {
						const queryResult = `SELECT n.id, n.title, n.description, u."userName" FROM notes as n JOIN users as u on n.user_id=u.id
						where n.id='${note.id}'`
						pool.query(queryResult, (err, result) => {
							if (err)
								reject({
									status: 500,
									message: "Internal server error",
								})
							else {
								const note = result.rows[0]
								const payload = {
									id: note.id,
									title: note.title,
									description: note.description,
									creator: note.userName,
								}
								resolve({
									data: payload,
								})
							}
						})
					}
				}
			})
		})
	},
	deleteNote: (id) => {
		return new Promise((resolve, reject) => {
			const qs = `DELETE FROM "notes" WHERE id='${id}'`
			pool.query(qs, (err, result) => {
				if (err)
					reject({ status: 500, message: "Internal server error" })
				else {
					if (!result) {
						reject({
							status: 406,
							message: "Something went wrong with update note",
						})
					} else if (result) {
						resolve({
							status: 200,
							response: {
								status: "Success",
								message: "Success delete note",
							},
						})
					}
				}
			})
		})
	},
	getNoteAuthId: (id) => {
		return new Promise((resolve, reject) => {
			const qs = `SELECT n.id, n.title, n.description,n.user_id, u."userName" FROM notes as n JOIN users as u on n.user_id=u.id
			where n.id='${id}'`
			pool.query(qs, (err, result) => {
				if (err)
					reject({ status: 500, message: "Internal server error" })
				else {
					const note = result.rows[0]
					if (!note) {
						reject({ status: 404, message: "Data not found" })
					} else {
						resolve({ note })
					}
				}
			})
		})
	},
}
