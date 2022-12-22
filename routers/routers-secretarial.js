const express = require("express")
const router = express.Router()


router.get("/consol", (req, res)=> res.render("console-escola-page"))


module.exports = router