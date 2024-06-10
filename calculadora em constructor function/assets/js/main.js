function Calculadora() {
  this.display = document.querySelector('.display')
  this.inicia = () => {
    this.cliqueBotoes()
    this.pressionaEnter()
  }
  this.cliqueBotoes = () => {
    // Listener dos botões
    document.addEventListener('click', (e) => {
      const element = e.target
      if (element.classList.contains('btn-num')) this.btnParaDisplay(element) // Captura o valor dos botões clicados e chama a função que envia o texto capturado pra o input
      if (element.classList.contains('btn-clear')) this.clearDisplay() // Limpa o input
      if (element.classList.contains('btn-del')) this.apagaUm() // Apaga ultimo numero
      if (element.classList.contains('btn-eq')) this.realizaConta() // Resultado
    })
  }
  // Funções
  // Envia o valor capturado no listener dos botões para o input
  this.btnParaDisplay = (element) => (this.display.value += element.innerText)
  // Limpa o input
  this.clearDisplay = () => {
    this.display.value = ''
    this.display.focus()
  }
  // Apaga o ultimo número
  this.apagaUm = () => (this.display.value = this.display.value.slice(0, -1)) // O 0 é o tamanho da string e em seguida corta um número, neste caso o ultimo digitado
  // FAZ A OPERAÇÃO DO RESULTADO
  this.realizaConta = () => {
    try {
      /* A função eval é muito perigosa, pois ela pega oque tiver dentro e tenta executar no motor do javascript
        seja um simples alert ou até qualquer codigo */
      let conta = eval(this.display.value) // Vai pegar oque esta dentro do input e o motor do javascript vai executar como codigo javascript por conta do eval e armazenar na propia variavel CONTA
      // Se for algo diferente de uma conta, retornará um alert
      if (!conta) {
        alert('Conta inválida')
        return
      }
      // Caso de tudo certo, irá executar a conta
      // FUNCTION PRINCIPAL ↓↓↓↓↓↓↓↓↓↓↓↓
      else {
        this.display.value = conta
      }
      return
    } catch (error) {
      // Se for algo diferente de uma conta, retornará um alert
      alert('Conta inválida')
      return
    }
  }
  // Enviar com enter
  this.pressionaEnter = () => {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) this.realizaConta()
      return
    })
  }
}

const calculadora = new Calculadora()
// Inicia a calculdaora
calculadora.inicia()
