const pool = require("../config/connection")

const createUserTable = `DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (
    "id" SERIAL PRIMARY KEY,
    "userName" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255),
    "createdAt" VARCHAR(255),
    "updatedAt" VARCHAR(255)
);`

pool.query(createUserTable, (err, res) => {
	if (err) console.log(err)
	console.log("create user success")
	pool.end()
})
