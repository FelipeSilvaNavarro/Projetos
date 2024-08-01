/**
 * Define a classe `Login` para gerenciar a validação de formulários de login e cadastro.
 * Inclui validação de e-mail e senha, manipulação de erros e mensagens flash.
 * Utiliza a biblioteca `validator` para validação de dados no front-end.
 */

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
        if (!this.form) return // Se o form não existe, não faz nada
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    /**
     * Valida os campos do formulário e exibe erros se necessário.
     * @param {Event} e - O evento de submissão do formulário.
     */
    validate (e) {
        const el = e.target
        // Pega os dados dos campos
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        // Flag de erro
        let error = false
        this.clearErrors()
        // Valida e-mail e senha
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

    /**
     * Limpa todas as mensagens de erro do formulário.
     */
    clearErrors () {
        const errorDivs = document.querySelectorAll('.form-error')
        errorDivs.forEach(div => div.remove())
    }

    /**
     * Exibe uma mensagem de erro ao lado do campo de entrada.
     * @param {HTMLElement} input - O campo de entrada onde o erro será exibido.
     * @param {string} message - A mensagem de erro a ser exibida.
     */
    showError (input, message) {
        const div = document.createElement('div')
        div.className = 'form-error text-danger'
        div.innerText = message
        input.parentElement.appendChild(div)
    }
}
