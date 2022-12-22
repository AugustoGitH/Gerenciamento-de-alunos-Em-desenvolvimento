function visibilityPass(el){
    let input = el.parentNode.querySelector("input")
    if(input.type === "text") return input.type = "password"
    else return input.type = "text"
}



const inputsValidation = {
    inputsForm: {
        email: document.querySelector("#email-input"),
        senha: document.querySelector("#senha-input"),
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
    email(){
        let input = this.inputsForm.email
        let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.addEventInput(input, inputValue=>{
            if(!regex.test(inputValue)) return this.popUpAlert(input, "open")
            else return this.popUpAlert(input, "close")
        })
    },
    senha(){
        let input = this.inputsForm.senha
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/
        this.addEventInput(input, inputValue=>{
            if(!regex.test(inputValue)) return this.popUpAlert(input, "open")
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
        <button class="button-submit">Se logar<i class='bx bx-run'></i></button>
    `
    const buttonSubmit = document.querySelector(".button-submit") || null
    buttonSubmit.addEventListener("click", submitInfosForm)
}

document.addEventListener("DOMContentLoaded", ()=>{
    inputsValidation.email()
    inputsValidation.senha()
})



function submitInfosForm(){
    let options = {
        method: "POST",
        header: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({
            email: inputsValidation.email.value,
            senha: inputsValidation.senha.value
        })
    }
}