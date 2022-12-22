const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    nomeCompleto_adm: {type: String, required: true},
    dataNascimento_adm: {type: String, required: true},
    token: {type: String, required: true},
    accessLevel: {type: Object, default: {
        aluno: false,
        professor: false,
        secretaria: true
    }},
    cpf_adm: {type: Number, required: true},
    nomeEscola: {type: String, required: true},
    cidade: {type: String, required: true},
    estado: {type: String, required: true},
    celular: {type: Number, required: true},
    telefone: {type: Number, required: true}
})

module.exports = mongoose.model("User", userSchema)