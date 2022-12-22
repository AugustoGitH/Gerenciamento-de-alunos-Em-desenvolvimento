function visibilityPass(el){
    let input = el.parentNode.querySelector("input")
    if(input.type === "text") return input.type = "password"
    else return input.type = "text"
}



const inputsValidation = {
    inputsForm: {
        nome: document.querySelector("#nome-input"),
        email: document.querySelector("#email-input"),
        token: document.querySelector("#token-input"),
        criarSenha: document.querySelector("#senha-input"),
        confirmSenha: document.querySelector("#confirm-senha-input")
    },
    popUpAlert(input, status){
        if(status === "open"){
            input.parentNode.querySelector(".pop_alertInput").classList.remove("translate-alert")

            if(input.classList.contains("input-valid")) return input.classList.replace("input-valid", "input-invalid")
            else return input.classList.add("input-invalid")
        }
        else if(status === "close"){
            input.parentNode.querySelector(".pop_alertInput").classList.add("translate-alert")
            if(input.classList.contains("input-invalid")) return input.classList.replace("input-invalid", "input-valid")
            else return input.classList.add("input-valid")
        }
    },
    addEventInput(input, cb){
        return input.addEventListener("input", ()=>{
            cb(input.value)
            verifyStatusForm()
        })
    },
    nome(){
        let input = this.inputsForm.nome
        this.addEventInput(input, inputValue=>{
            if(input.value.length < 5 && input.value.split(" ").length < 2) return this.popUpAlert(input, "open")
            else return this.popUpAlert(input, "close")
        })
    },
    email(){
        let input = this.inputsForm.email
        let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.addEventInput(input, inputValue=>{
            if(!regex.test(inputValue)) return this.popUpAlert(input, "open")
            else return this.popUpAlert(input, "close")
        })
    },
    token(){
        let input = this.inputsForm.token
        this.addEventInput(input, inputValue=>{
            if(inputValue.length <= 10) return this.popUpAlert(input, "open")
            else return this.popUpAlert(input, "close")
        })
    },
    criarSenha(){
        let input = this.inputsForm.criarSenha
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/
        this.addEventInput(input, inputValue=>{
            if(!regex.test(inputValue)) return this.popUpAlert(input, "open")
            else return this.popUpAlert(input, "close")
        })
    },
    confirmSenha(){
        let input = this.inputsForm.confirmSenha
        this.addEventInput(input, inputValue=>{
            let inputSenhaValue = this.inputsForm.criarSenha.value
            if(inputValue !== inputSenhaValue) return this.popUpAlert(input, "open")
            else return this.popUpAlert(input, "close")
        })
    }

}
function verifyStatusForm(){
    let inputsCheck = document.querySelectorAll(".input-valid")
    let inputsForm = document.querySelectorAll(".quest-form input")
    if(inputsCheck.length === inputsForm.length){
        createButtonSubmit()
    }else if(document.querySelector(".button-submit")){
        document.querySelector(".button-submit").remove()
    }
}
function createButtonSubmit(){
    document.querySelector(".button_submit-container").innerHTML = `
        <button class="button-submit">Se registrar<i class='bx bx-run'></i></button>
    `
    const buttonSubmit = document.querySelector(".button-submit")
    buttonSubmit.addEventListener("click", (ev)=> submitInfosForm(ev))
}

document.addEventListener("DOMContentLoaded", ()=>{
    inputsValidation.nome()
    inputsValidation.email()
    inputsValidation.token()
    inputsValidation.criarSenha()
    inputsValidation.confirmSenha()
})


async function submitInfosForm(ev){
    ev.preventDefault()
    let options = {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({
            nomeCompleto: inputsValidation.inputsForm.nome.value,
            email: inputsValidation.inputsForm.email.value,
            token: inputsValidation.inputsForm.token.value,
            senha: inputsValidation.inputsForm.criarSenha.value
        })
    }
    fetch("/auth/api/register", options).then(res=>{
        console.log(res)
    })
}