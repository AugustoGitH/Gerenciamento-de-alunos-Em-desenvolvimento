const generateAuthenticationToken = {
    generaTokenPrimary: (lengthToken)=>{
        let caracteres =  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%¨&*()+{[}[]|?:"
        let tokenPrimary = ""
        for(let i = 0; i <= lengthToken; i++)  tokenPrimary += caracteres[Math.floor(Math.random() * caracteres.length)]
        return tokenPrimary
    }
    
}

console.log(generateAuthenticationToken.generaTokenPrimary(40))



