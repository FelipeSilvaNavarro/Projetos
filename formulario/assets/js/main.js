/**
 * Classe para validar formulário.
 * Function principal
 */
class ValidaFormulario {
  /**
   * Inicializa os elementos do formulário e configura os eventos.
   */
  constructor() {
    // Itens do HTML
    this.formulario = document.querySelector('.form')
    this.eventos() // Chama o evento a cada vez que o ValidaFormulario é chamado, e dentro dos eventos tem todos as regras
  }

  /**
   * Configura os eventos do formulário.
   * Adiciona um listener para o evento de submit do formulário.
   */
  eventos() {
    this.formulario.addEventListener('submit', (e) => {
      // A função arrow não altera o escopo de 'this', então podemos chamar diretamente 'handleSubmit'
      this.handleSubmit(e)
    })
  }

  /**
   * Manipula o evento de submit do formulário.
   * @param {Event} e - Objeto de evento do submit.
   */
  handleSubmit(e) {
    e.preventDefault() // Impede que o formulário seja enviado / página seja atualizada automaticamente
    // As flags foram iniciadas como true e muda-se durante as modificações de cada function
    const camposValidos = this.camposValidos()
    const senhasValidas = this.senhasValidas()
    if (camposValidos && senhasValidas) {
      alert('Formulário enviado')
      this.formulario.submit() // Envia o formulário
    }
  }

  /**
   * Verifica se as senhas são válidas.
   * @returns {boolean} true se as senhas são válidas, false caso contrário.
   */
  senhasValidas() {
    let valid = true // Flag para indicar se as senhas são válidas
    const senha = this.formulario.querySelector('.senha')
    const repetirSenha = this.formulario.querySelector('.repetirSenha')

    // Verifica se as senhas são diferentes
    if (senha.value !== repetirSenha.value) {
      this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais')
      this.criaErro(
        repetirSenha,
        'Campos senha e repetir senha precisam ser iguais'
      )
      valid = false
    }

    // Verifica se a senha tem o tamanho adequado
    if (senha.value.length > 12 || senha.value.length < 6) {
      this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres')
      valid = false
    }

    return valid
  }

  /**
   * Verifica se todos os campos do formulário são válidos.
   * @returns {boolean} true se todos os campos são válidos, false caso contrário.
   */
  camposValidos() {
    let valid = true // Flag para indicar se todos os campos são válidos

    // Remove todas as mensagens de erro existentes
    for (let textoErro of this.formulario.querySelectorAll('.msgErro')) {
      textoErro.remove()
    }

    // Itera sobre todos os campos do formulário para validação
    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText // Texto do label associado ao campo

      // Verifica se o campo está vazio
      if (!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar vazio`)
        valid = false
      }

      // Validação específica para CPF
      if (campo.classList.contains('cpf')) {
        if (!this.validaCpf(campo)) {
          valid = false
        }
      }

      // Validação específica para usuário
      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) {
          valid = false
        }
      }
    }

    return valid
  }

  /**
   * Valida o campo de usuário.
   * @param {HTMLInputElement} campo - Elemento input do usuário.
   * @returns {boolean} true se o usuário é válido, false caso contrário.
   */
  validaUsuario(campo) {
    const usuario = campo.value
    let valid = true // Flag para indicar se o usuário é válido

    // Verifica se o usuário tem o tamanho adequado
    if (usuario.length > 12 || usuario.length < 3) {
      this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres')
      valid = false
    }

    // Verifica se o usuário contém apenas letras e números
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Usuário deve conter apenas letras e/ou números')
      valid = false
    }

    return valid
  }

  /**
   * Valida o campo de CPF utilizando a classe ValidaCPF.
   * @param {HTMLInputElement} campo - Elemento input do CPF.
   * @returns {boolean} true se o CPF é válido, false caso contrário.
   */
  validaCpf(campo) {
    const cpf = new ValidaCPF(campo.value) // Classe ValidaCPF com o valor do campo CPF, nn precisa ser instancia pois é static
    if (!cpf.valida()) {
      this.criaErro(campo, 'CPF Inválido')
      return false
    }
    return true
  }

  /**
   * Cria uma mensagem de erro e a insere após o campo específico.
   * @param {HTMLInputElement} campo - Elemento input onde será inserida a mensagem de erro.
   * @param {string} msg - Mensagem de erro a ser exibida.
   */
  criaErro(campo, msg) {
    const div = document.createElement('div')
    div.innerHTML = msg // Define o conteúdo HTML da div como a mensagem de erro
    div.setAttribute('class', 'msgErro')
    // Coloca a mensagem após o campo
    campo.insertAdjacentElement('afterend', div)
  }
}

const valida = new ValidaFormulario() // Instancia a classe ValidaFormulario para inicializar a validação do formulário
