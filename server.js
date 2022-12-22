const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")


const routersPublic = require("./routers/routers-public")
const routersSecretarial = require("./routers/routers-secretarial")
const routersAuthentication = require("./routers/router-authentication")


app.use("/public", express.static("public"))
app.set("view engine", "ejs")
app.use(cookieParser())


app.use(bodyParser.json({limit: '99999mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '99999mb', extended: true}))

app.use("/", routersPublic)
app.use("/secretarial-system", routersSecretarial)
app.use("/auth/api", routersAuthentication)








app.listen(process.env.PORT, ()=> console.log("Servidor rodando na porta " + process.env.PORT))
mongoose.connect(process.env.MONGO_CONNECTION_URL, err => err ? console.log(err) : console.log("Banco de dados conectado!"))
