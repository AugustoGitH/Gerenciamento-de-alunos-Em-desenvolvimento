const { registerValidate, loginValidate } = require("./validate-form.js")
const User = require("../models/User.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

module.exports = {
    register: async(req, res)=>{
        // let {error} = registerValidate(req.body)
        // if(error) return res.status(500).send({message: error})
        let {nomeCompleto, email, token, senha}  = req.body
        let nomeCompletoTreated = nomeCompleto.toLowerCase().replace(/ /ig, "")
        let user = await User.findOne({nomeCompleto_adm: nomeCompletoTreated})
        if(!user) return res.status(401).send({message: "Usuário não está registrado em nosso sistema!", err: true})
        if(token !== user.token) return res.status(401).send({message: "O token usado é inválido!", err: true})
        try{
            const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
            //email, senha: bcrypt.hashSync(senha)
            User.updateOne({token}, {$inc:{email: email, senha: bcrypt.hashSync(senha)}}).then(status=>{
                console.log(status)
            }).catch(err=>{
                console.log(err)
            })

        }catch(err){
            console.log(err)
            return res.status(401).send({message: "O token usado é inválido!", err: true})
        }
        // }
        // const tokenJWT = jwt.sign({identificationCode: "69hEV[r@&#KohR6wtY|oIjl3vH$gIG3@3Ad(|CZi3", managementLevel: "secretaria"}, process.env.TOKEN_SECRET)
        // const user = new User({
            
        // })
        // user.save().then(user=>{
        //     console.log(user)
        // }).catch(err=>{
        //     console.log(err)
        // })
    }

}