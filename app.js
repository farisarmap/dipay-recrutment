const express = require("express")
const app = express()
const PORT = 3000

const routes = require("./src/routes")
const error_handling = require("./src/middlewares/error_handler")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)
app.use(error_handling)

app.listen(PORT, () => {
	console.log("listening to port:", PORT)
})
