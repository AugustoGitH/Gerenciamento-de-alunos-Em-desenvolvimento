const express = require("express")
const router = express.Router()
const authenticationControllers = require("../controllers/authentication-controllers")

router.post("/register", authenticationControllers.register)







module.exports = router