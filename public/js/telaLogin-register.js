class Input{
    constructor({placeholder, required, autoComplete, type, value}){
        return {
            placeholder,
            required: required ? "required" : "",
            type: !type ? "text" : type,
            autoComplete: !autoComplete ? "on" : autoComplete,
            id: placeholder.replace(/\s/g, "").toLowerCase().substring(0, 6) + "-id",
            value: !value ? "" : value

        }
    }
}

const formsTemplate = {

    aluno: [
        new Input({placeholder: "Nome Completo", required: true}),
        new Input({placeholder: "Email", required: true}),
        new Input({placeholder: "Escola", required: true}),
        new Input({placeholder: "Turma", required: true}),
    ],
    professor: [
        new Input({placeholder: "Nome Completo", required: true}),
        new Input({placeholder: "Email", required: true}),
        new Input({placeholder: "Escola", required: true}),
        new Input({placeholder: "Token de autenticação", required: true, autoComplete: "off" }),
        new Input({placeholder: "Crie sua senha", required: true, type: "password"}),
        new Input({placeholder: "Confirme sua senha", required: true, type: "password"}),
    ],
    escola: [
        new Input({placeholder: "Email", required: true}),
        new Input({placeholder: "Token de autenticação", required: true}),
        new Input({placeholder: "Crie sua senha", required: true, type: "password"}),
        new Input({placeholder: "Confirme sua senha", required: true, type: "password"}),
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
                        <input id="${input.id}" class="input-form-register" type="${input.type}" ${input.required} autocomplete="${input.autoComplete}" ${input.id === "confir-id" ? "oninput='verifyConfPass(this)'" : ""}>
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
function verifyCheckedInputs(){
    let inputs = document.querySelectorAll(".input-form-register")
    let inputsVazios = inputs.length
    inputs.forEach(input=>{
        if(!input.value) inputsVazios - 1
        input.addEventListener("input", ()=>{
            if(Array.from(inputs).every(input=> input.value) && document.querySelectorAll(".translate-alert")){
                document.querySelector("#form-inputs-container").innerHTML += `<button>Fala</button>`
            }
            let popAlert = input.parentNode.querySelector(".pop_alertInput")
            if(input.id === "nomeco-id" &&  input.value.length < 5) return popAlert.classList.remove("translate-alert")
            if(input.id === "email-id" && input.value.indexOf("@") === -1) return popAlert.classList.remove("translate-alert")
            popAlert.classList.add("translate-alert")
            
            

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
    if(inputObservable.value !== input.value){
        popAlert.classList.remove("translate-alert")
    }else{
        popAlert.classList.add("translate-alert")
    }
    
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