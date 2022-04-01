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
				if (err) reject(err)
				else {
					resolve({
						status: 201,
						message: "Success create user",
						data,
						userId: data.rows[0].id,
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
				const verifyUser = comparePassword(
					password,
					userByUserName.password
				)
				if (!verifyUser) {
					reject({ status: 401, message: "Unauthorized!" })
				} else if (verifyUser) {
					const token = generateToken({
						userName: userByUserName.userName,
					})
					const insertToken = `UPDATE "users" SET "token"='${token}' WHERE id='${userByUserName.id}'`
					pool.query(insertToken, (err, data) => {
						resolve({
							status: 201,
							response: {
								status: "Success",
								access_token: token,
							},
						})
					})
				}
			})
		})
	},
	refreshToken: (body) => {
		return new Promise((resolve, reject) => {
			const token = body.refreshToken
			const qs = `SELECT * FROM "users" WHERE "token"='${token}'`
			pool.query(qs, (err, data) => {
				if (err) reject(err)
				const user = data.rows[0]
				const getNewToken = generateToken({ userName: user.userName })
				const updateToken = `UPDATE "users" SET "token"='${getNewToken}' WHERE id='${user.id}'`
				pool.query(updateToken, (err, data) => {
					resolve({
						status: 200,
						response: {
							status: "Success",
							access_token: getNewToken,
						},
					})
				})
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
				const updateToken = `UPDATE "users" SET "token"=NULL WHERE id='${user.id}'`
				pool.query(updateToken, (err, result) => {
					if (err) reject(err)
					resolve({
						status: 200,
						response: {
							status: "Success",
							message: "Success delete token",
						},
					})
				})
			})
		})
	},
	findByUsername: (userName) => {
		return new Promise((resolve, reject) => {
			const qs = `SELECT * from "users" WHERE "userName"='${userName}'`
			pool.query(qs, (err, result) => {
				if (err) reject(err)
				else {
					resolve(result.rows[0])
				}
			})
		})
	},
}
