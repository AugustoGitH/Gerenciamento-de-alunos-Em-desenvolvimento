class Input{
    constructor({placeholder, name, required, autoComplete, type, value}){
        return {
            placeholder,
            required: required ? "required" : "",
            name,
            type: !type ? "text" : type,
            autoComplete: !autoComplete ? "on" : autoComplete,
            name,
            id: placeholder.replace(/\s/g, "").toLowerCase().substring(0, 6) + "-id",
            value: !value ? "" : value
        }
    }
}

const formsTemplate = {

    aluno: [
        new Input({placeholder: "Nome Completo", required: true, name: "nome"}),
        new Input({placeholder: "Email", required: true,  name: "email"}),
        new Input({placeholder: "Escola", required: true, name: "escola"}),
        new Input({placeholder: "Turma", required: true, name: "turma"}),
    ],
    professor: [
        new Input({placeholder: "Nome Completo", required: true, name: "nome"}),
        new Input({placeholder: "Email", required: true, name: "email"}),
        new Input({placeholder: "Escola", required: true, name: "escola"}),
        new Input({placeholder: "Token de autenticação", name: "token", required: true, autoComplete: "off" }),
        new Input({placeholder: "Crie sua senha", name: "senha", required: true, type: "password"}),
        new Input({placeholder: "Confirme sua senha",  name: "senha-confirm", required: true, type: "password"}),
    ],
    escola: [
        new Input({placeholder: "Email", required: true, name: "email"}),
        new Input({placeholder: "Token de autenticação", required: true, name: "token"}),
        new Input({placeholder: "Crie sua senha", required: true, type: "password", name: "senha"}),
        new Input({placeholder: "Confirme sua senha", required: true, type: "password", name: "senha-confirm"}),
    ]
}
function renderInputsForm(form){
    let nomeForm = form.toLowerCase()
    let containerForm = document.querySelector("#form-inputs-container")
    let createInputs = inputs=>{
        let inputsInnerHTML = ""
        inputs.forEach(input=>{
            inputsInnerHTML += `
                    <div class="input_form translate-form">
                        <div class="pop_alertInput translate-alert"><i class='bx bxs-error-alt'></i></div>
                        <input id="${input.id}" name="${input.name}" class="input-form-register" type="${input.type}" ${input.required} autocomplete="${input.autoComplete}" ${input.id === "confir-id" ? "oninput='verifyConfPass(this)'" : ""}>
                        <label>${input.placeholder}</label>
                        ${input.type === "password" ? "<i class='bx bxs-low-vision icon-visibility' onclick='toggleVisibilityPass(this)'></i>" : ""}
                    </div>
                    `
            
        })
        containerForm.innerHTML = inputsInnerHTML
        translateInputs("input_form")
        verifyCheckedInputs()
    }
    if(nomeForm === "aluno") return createInputs(formsTemplate.aluno)
    if(nomeForm === "professor") return createInputs(formsTemplate.professor)
    if(nomeForm === "escola") return createInputs(formsTemplate.escola)

}
function translateInputs(container){
    document.querySelectorAll(`.${container}`).forEach((input, index)=>{
        setTimeout(()=>{
            input.classList.remove("translate-form")
        }, (index + 1)* 200)
    })
}


const verificationParameters = {
    messAlert(state, input){
        let popAlert = input.parentNode.querySelector(".pop_alertInput")
        if(state === "open"){
            popAlert.classList.remove("translate-alert")
            return false
        }
        else if(state === "close"){
            popAlert.classList.add("translate-alert")
            return true
        }
    },
    name(input){
        if(input.value.split(" ").length <= 1 || input.value.length < 4 || input.value.length > 40) return this.messAlert("open", input)
        else return this.messAlert("close", input)
    },
    email(input){
        if(!input.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || input.value.length > 40) return this.messAlert("open", input)
        else return this.messAlert("close", input)
    },
    senha(input){
        if(!input.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)){
            return this.messAlert("open", input)
        }
        else return this.messAlert("close", input)
    },
    default(input){
        if(input.value.length <= 2) return this.messAlert("open", input)
        else return this.messAlert("close", input)
    }
}

function verifyCheckedInputs(){
    let inputs = document.querySelectorAll(".input-form-register")
    let inputsVazios = inputs.length
    inputs.forEach(input=>{
        input.addEventListener("input", ()=>{
            if(input.name === "nome") return verificationParameters.name(input)
            if(input.name === "email") return verificationParameters.email(input)
            if(input.name === "senha") return verificationParameters.senha(input)
            else return verificationParameters.default(input)
        })
    })
}



function toggleVisibilityPass(icon){
    let input = icon.parentNode.querySelector("input")
    if(input.type === "password") input.type = "text"
    else input.type = "password"
       
}
function verifyConfPass(input){
    let inputObservable = input.parentNode.parentNode.querySelector("#criesu-id")
    let popAlert = input.parentNode.querySelector(".pop_alertInput")
    if(inputObservable.value !== input.value) return popAlert.classList.remove("translate-alert")
    else return popAlert.classList.add("translate-alert")
    
}
function openForm(form, button){
    markButtonActive(button)
    renderInputsForm(form)
}
function markButtonActive(button){
    let buttonsNav = button.parentNode.querySelectorAll("button")
    buttonsNav.forEach(button=>  button.classList.contains("button-active") ? button.classList.remove("button-active") : 0)
    button.classList.add("button-active")
}
document.addEventListener("DOMContentLoaded", ()=>{
    renderInputsForm("aluno")
})