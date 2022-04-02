const bcrypt = require("bcrypt")

const hashPassword = (password) => {
	return bcrypt.hashSync(password, +process.env.SALT)
}

const comparePassword = (plainPassword, password) => {
	return bcrypt.compareSync(plainPassword, password)
}

module.exports = {
	hashPassword,
	comparePassword,
}
