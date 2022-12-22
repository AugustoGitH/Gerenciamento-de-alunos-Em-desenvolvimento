const express = require("express")
const router = express.Router()


router.get("/", (req, res)=> res.render("telaInicial"))
router.get("/login", (req, res)=> res.render("telaLogin"))
router.get("/register", (req, res)=> res.render("telaRegister"))



module.exports = router