const pool = require("../config/connection")

const createUserTable = `DROP TABLE IF EXISTS "Users";
CREATE TABLE IF NOT EXISTS "Users" (
    "id" SERIAL PRIMARY KEY,
    "userName" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255),
    "createdAt" VARCHAR(255),
    "updatedAt" VARCHAR(255)
);`

const createNoteTable = `DROP TABLE IF EXISTS "Notes";
CREATE TABLE IF NOT EXISTS "Notes" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" VARCHAR(255),
    "updatedAt" VARCHAR(255),
    "UserId" INT REFERENCES Users (id)
);`

pool.query(createUserTable, (err, res) => {
	if (err) console.log(err)
	else {
		console.log("create table user success")
		// pool.end()
		pool.query(createNoteTable, (err, res) => {
			if (err) console.log(err)
			else {
				console.log("create table note success")
				pool.end()
				// pool.query(alterTableUserNote, (err, res) => {
				// 	if (err) console.log(err)
				// 	console.log("alter table success")
				// })
			}
		})
	}
})
// pool.query(createNoteTable, (err, res) => {
// 	if (err) console.log(err)
// 	else {
// 		console.log("create table note success")
// 		pool.end()
// 	}
// })
