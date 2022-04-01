const bcrypt = require("bcrypt")

const hashPassword = (password) => {
	return bcrypt.hashSync(password, 10)
}

const comparePassword = (plainPassword, password) => {
	return bcrypt.compareSync(plainPassword, password)
}

module.exports = {
	hashPassword,
	comparePassword,
}
