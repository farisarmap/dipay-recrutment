const pool = require("../config/connection")

const createNotes = ` DROP TABLE IF EXISTS Notes;
CREATE TABLE IF NOT EXISTS Notes (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" VARCHAR(255),
    "updatedAt" VARCHAR(255),
    "user_id" INT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) 
);`

pool.query(createNotes, (err, res) => {
	if (err) console.log(err)
	else {
		console.log("success create notes")
		pool.end()
	}
})
