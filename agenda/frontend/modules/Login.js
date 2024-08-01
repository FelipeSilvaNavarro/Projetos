export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }
    init() {
        this.events()
    }
    events() {
        if(!this.form) return // Se o form nn existe, nn faz nada
        this.form.addEventListener('submit', e=> {
            e.preventDefault()
            alert('FORM NÃO ENVIADO')
        })
    }
}