/**
 * Define a classe `Contato` para gerenciar a validação de formulários de edição e criação de contatos.
 * Inclui validação de Nome, sobrenome, email e telefone, manipulação de erros e mensagens flash.
 * Utiliza a biblioteca `validator` para validação de dados direto no front-end.
 */

import validator from "validator"

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
        this.errorMessages = {
            nome: 'Nome é um campo obrigatorio',
            email: 'Email inválido',
            telefone: 'Telefone é um campo obrigatorio'
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
        const nomeInput = el.querySelector('input[name="nome"]')
        const telefoneInput = el.querySelector('input[name="telefone"]')
        // Flag de erro
        let error = false
        this.clearErrors()
        // Valida nome, email e telefone
        if (!validator.isEmail(emailInput.value)) {
            this.showError(emailInput, this.errorMessages.email)
            error = true
        }
        if (!nomeInput.value) {
            this.showError(nomeInput, this.errorMessages.nome)
            error = true
        }
        if (!telefoneInput.value) {
            this.showError(telefoneInput, this.errorMessages.telefone)
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
     * Exibe uma mensagem de erro embaixo do campo de entrada.
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
