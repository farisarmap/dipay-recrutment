require("dotenv").config()

const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")

const PORT = +process.env.PORT

const routes = require("./src/routes")
const HttpException = require("./src/utils/httpException")
const winston = require("./src/logger")
const errorHandling = require("./src/middlewares/errorHandling")

const app = express()

app.use(morgan("tiny", { stream: winston.stream }))
app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// API routes
app.use(routes)

// 404 error for endpoint
app.get("*", (req, res, next) => {
	const err = new HttpException(404, "Endpoint Not Found")
	next(err)
})
app.post("*", (req, res, next) => {
	const err = new HttpException(404, "Endpoint Not Found")
	next(err)
})
app.put("*", (req, res, next) => {
	const err = new HttpException(404, "Endpoint Not Found")
	next(err)
})
app.delete("*", (req, res, next) => {
	const err = new HttpException(404, "Endpoint Not Found")
	next(err)
})

// Error Handling
app.use(errorHandling)

app.listen(PORT, () => {
	winston.info(
		`Server listing at http://${process.env.HOST}:${process.env.PORT}`
	)
})
