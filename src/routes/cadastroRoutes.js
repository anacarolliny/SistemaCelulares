const express = require("express")
const controller = require("../controllers/cadastroController")
const router = express.Router()



router.get("/", controller.home)
router.get("/cadastros", controller.getAll)
router.get("/cadastros/:id", controller.getId)
router.post("/cadastros", controller.create)
router.put("/cadastros/:id", controller.update)
router.delete("/cadastros/:id", controller.remove)



module.exports = router