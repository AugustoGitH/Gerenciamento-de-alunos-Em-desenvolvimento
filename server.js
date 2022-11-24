const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")

const routersViews = require("./routers/routersViews")

app.use("/", routersViews)

app.use("/public", express.static("public"))
app.use(cookieParser())

app.use(bodyParser.json({limit: '99999mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '99999mb', extended: true}))



app.set("view engine", "ejs")





app.listen(process.env.PORT, ()=> console.log("Servidor rodando na porta " + process.env.PORT))
mongoose.connect(process.env.MONGO_CONNECTION_URL, err => err ? console.log(err) : console.log("Banco de dados conectado!"))
