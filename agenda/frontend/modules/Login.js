import validator from "validator"

// Mensagens flash
localStorage.setItem('flashmessage', JSON.stringify({
    type: 'error',
    text: 'Email inválido'
}))
export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
        this.errorMessages = {
            email: 'Email inválido',
            password: 'Senha precisa ter entre 3 e 50 caracteres'
        }
    }
    init () {
        this.events()
    }
    events () {
        if (!this.form) return // Se o form nn existe, nn faz nada
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }
    // Checa os campos, quais campos são
    validate (e) {
        const el = e.target
        // Pega os dados
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        // Flag de error
        let error = false
        this.clearErrors()
        // Faz a msm coisa que o valida od loginModel porém sem bater no bd, valida direto no front, dessa forma economiza varias idas ao bd
        if (!validator.isEmail(emailInput.value)) {
            this.showError(emailInput, this.errorMessages.email)
            error = true
        }
        if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.showError(passwordInput, this.errorMessages.password)
            error = true
        }
        if (!error) el.submit()
    }
    clearErrors () {
        const errorDivs = document.querySelectorAll('.form-error')
        errorDivs.forEach(div => div.remove())
    }

    showError (input, message) {
        const div = document.createElement('div')
        div.className = 'form-error text-danger'
        div.innerText = message
        input.parentElement.appendChild(div)
    }
}