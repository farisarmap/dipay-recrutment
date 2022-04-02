const router = require("express").Router()
const UserController = require("../controllers/UserController")
const NoteController = require("../controllers/NoteController")
const authentication = require("../middlewares/authentication")
const auth_author = require("../middlewares/auth_author")

// routes user
router.post("/users", UserController.register)
router.post("/authentications", UserController.login)
router.put("/authentications", UserController.refreshToken)
router.delete("/authentications", UserController.logout)

// routes notes
router.post("/notes", authentication, NoteController.create)
router.get("/notes", NoteController.getAll)
router.get("/notes/:id", NoteController.getById)
router.put("/notes/:id", auth_author, NoteController.updateNote)
router.delete("/notes/:id", auth_author, NoteController.deleteNote)

module.exports = router
