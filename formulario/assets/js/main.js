/* 
    TODO: Documentar TUDO
*/

class ValidaFormulario {
  constructor() {
    // Itens do HTML
    this.formulario = document.querySelector('.form')
    // --
    this.eventos()
  }
  eventos() {
    this.formulario.addEventListener('submit', (e) => {
      // A função arrow nn permite alteração do THIS
      this.handleSubmit(e)
    })
  }
  handleSubmit(e) {
    // Para que o form nn seja enviado / atualizado a pag
    e.preventDefault()
    const camposValidos = this.camposValidos()
    const senhasValidas = this.senhasValidas()
    if (camposValidos && senhasValidas) {
      alert('Formulario enviado')
      this.formulario.submit()
    }
  }
  senhasValidas() {
    // Verifica se as senhas são iguais
    let valid = true
    const senha = this.formulario.querySelector('.senha')
    const repetirSenha = this.formulario.querySelector('.repetirSenha')
    if (senha.value !== repetirSenha.value) {
      this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais')
      this.criaErro(
        repetirSenha,
        'Campos senha e repetir senha precisam ser iguais'
      )
      valid = false
    }
    // Verifica se a senha esta entre 6 e 12 caracteres
    if (senha.value.length > 12 || senha.length < 6) {
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres')
      valid = false
    }
    return valid
  }
  camposValidos() {
    let valid = true
    // Apaga todas as msg de erros a cada envio do botão
    for (let textoErro of this.formulario.querySelectorAll('.msgErro')) {
      textoErro.remove()
    }
    // Loop principal
    // Pega todos os campos do formulario
    for (let campo of this.formulario.querySelectorAll('.validar')) {
      // Pega o texto do irmão anterior, pois todos são filhos do mesmo pai, o form, neste caso o label
      const label = campo.previousElementSibling.innerText
      // Verifica se o campo esta vazio
      if (!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar vazio`)
        valid = false
      }
      // Validar o CPF, prmeiro captura o campo do CPF
      // Não pode ser usado RETURN pq se nn para a função
      if (campo.classList.contains('cpf')) {
        if (!this.validaCpf(campo)) {
          valid = false
        }
      }
      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) {
          valid = false
        }
      }
    }
    return valid
  }
  validaUsuario(campo) {
    // Pega o texto do input do usuario que foi recebido no parametro do método
    const usuario = campo.value
    let valid = true
    if (usuario.length > 12 || usuario.length < 3) {
      this.criaErro(campo, 'Usuario precisa ter entre 12 e 3 caracteres')
      valid = false
    }
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      // Expressão regular que verifica se tem apenas letras e números, o match é pra ver se 'bate'
      this.criaErro(campo, 'Usuario precisa conter apenas letras e/ou números')
      valid = false
    }
    return valid
  }
  validaCpf(campo) {
    const cpf = new ValidaCPF(campo.value)
    if (!cpf.valida()) {
      this.criaErro(campo, 'CPF Inválido')
      return false
    }
    return true
  }
  criaErro(campo, msg) {
    const div = document.createElement('div')
    div.innerHTML = msg
    div.setAttribute('class', 'msgErro')
    div.setAttribute('id', 'msgErro')
    // Coloca a msg após o final do elemento
    campo.insertAdjacentElement('afterend', div)
  }
}
const valida = new ValidaFormulario()
