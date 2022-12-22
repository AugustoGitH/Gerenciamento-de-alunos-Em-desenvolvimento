const Joi = require("@hapi/joi")
const { joiPasswordExtendCore } = require("joi-password")
const joiPassword = Joi.extend(joiPasswordExtendCore)

const registerValidate = (data)=>{
    const schema = Joi.object({
        nomeCompleto: Joi.string().required("Digite seu nome comleto!").min(5).max(50),
        email: Joi.string().email({ tlds: { allow: false } }.required("Formato de email invalido!").min(4).max(50)),
        senha: joiPassword.string().minOfSpecialCharacters(1).minOfLowercase(1).minOfNumeric(1).noWhiteSpaces().required("Formato de senha incorreto!").min(9).max(14),
        token: Joi.string().required("Seu token está invalido!").min(10).max(40)
    })
    return schema.validate(data)
}

const loginValidate = (data)=>{
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }.required("Formato de email invalido!").min(4).max(50)),
        senha: joiPassword.string().minOfSpecialCharacters(1).minOfLowercase(1).minOfNumeric(1).noWhiteSpaces().required("Formato de senha incorreto!").min(9).max(14),
    })
    return schema.validate(data)
}

module.exports = { registerValidate, loginValidate }