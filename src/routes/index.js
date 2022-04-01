const router = require("express").Router()
const UserController = require("../controllers/UserController")
const NoteController = require("../controllers/NoteController")
const authorization = require("../middlewares/authorization")

// routes user
router.post("/users", UserController.register)
router.post("/authentications", UserController.login)
router.put("/authentications", UserController.refreshToken)
router.delete("/authentications", UserController.logout)

// routes notes
router.post("/notes", authorization, NoteController.create)
router.get("/notes", NoteController.getAll)
router.get("/notes/:id", NoteController.getById)
router.put("/notes/:id", authorization, NoteController.updateNote)
router.delete("/notes/:id", authorization, NoteController.deleteNote)

module.exports = router
