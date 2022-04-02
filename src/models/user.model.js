const pool = require("../config/connection")
const { hashPassword, comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

module.exports = {
	register: (body) => {
		return new Promise((resolve, reject) => {
			const payload = {
				...body,
				password: hashPassword(body.password),
				createdAt: new Date(),
				updatedAt: new Date(),
			}
			const qs = `INSERT INTO "users"("userName", "password", "fullName", "createdAt", "updatedAt")
            VALUES('${payload.userName}', '${payload.password}', '${payload.fullName}', '${payload.createdAt}', '${payload.updatedAt}') RETURNING *`
			pool.query(qs, (err, data) => {
				if (err)
					reject({ status: 500, message: "Internal server error" })
				else {
					resolve({
						user: data.rows[0],
					})
				}
			})
		})
	},
	login: (body) => {
		// login model with parameter username and password
		return new Promise((resolve, reject) => {
			const { userName, password } = body
			const qs = `SELECT * from "users" WHERE "userName"='${userName}'`
			pool.query(qs, (err, data) => {
				const userByUserName = data.rows[0]
				if (!userByUserName) {
					reject({ status: 401, message: "User not Found" })
				} else {
					const verifyUser = comparePassword(
						password,
						userByUserName.password
					)
					if (!verifyUser) {
						reject({ status: 401, message: "Password invalid!" })
					} else if (verifyUser) {
						const token = generateToken({
							userName: userByUserName.userName,
						})
						const insertToken = `UPDATE "users" SET "token"='${token}' WHERE id='${userByUserName.id}' RETURNING *`
						pool.query(insertToken, (err, data) => {
							resolve({
								token: token,
								refreshToken: data.rows[0].token,
							})
						})
					}
				}
			})
		})
	},
	refreshToken: (body) => {
		return new Promise((resolve, reject) => {
			const token = body.refreshToken
			const qs = `SELECT * FROM "users" WHERE "token"='${token}'`
			pool.query(qs, (err, data) => {
				const user = data.rows[0]
				if (user) {
					const getNewToken = generateToken({
						userName: user.userName,
					})
					const updateToken = `UPDATE "users" SET "token"='${getNewToken}' WHERE id='${user.id}' RETURNING *`
					pool.query(updateToken, (err, data) => {
						resolve({ token: data.rows[0].token })
					})
				} else if (!user) {
					reject({ status: 500, message: "User not found!" })
				}
			})
		})
	},
	deleteToken: (body) => {
		return new Promise((resolve, reject) => {
			const token = body.refreshToken
			const qs = `SELECT * FROM "users" WHERE "token"='${token}'`
			pool.query(qs, (err, data) => {
				if (err) reject(err)
				const user = data.rows[0]
				if (user) {
					const updateToken = `UPDATE "users" SET "token"=NULL WHERE id='${user.id}'`
					pool.query(updateToken, (err, result) => {
						if (err)
							reject({
								status: 500,
								message: "Internal server error",
							})
						if (result) {
							resolve({
								status: "Success",
							})
						} else if (!result) {
							reject({
								status: 500,
								message: "Fail delete token",
							})
						}
					})
				} else {
					reject({ status: 401, message: "User not found!" })
				}
			})
		})
	},
	findByUsername: (userName) => {
		return new Promise((resolve, reject) => {
			const qs = `SELECT * from "users" WHERE "userName"='${userName}'`
			pool.query(qs, (err, result) => {
				if (err) reject(err)
				if (result) {
					resolve(result.rows[0])
				} else if (!result) {
					reject({ status: 401, message: "User not found!" })
				}
			})
		})
	},
}
