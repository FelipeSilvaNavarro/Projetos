// FACTORY FUNCTION ↓↓↓↓↓↓↓↓↓↓↓↓
function criaCalculadora() {
  /*
        TODO
    */
  return {
    // Atributos dentro do objeto
    display: document.querySelector('.display'),
    btnClear: document.querySelector('.btn-clear'),
    btnDel: document.querySelector('btn-del'),
    btnEqual: document.querySelector('btn-eq'),

    // Metodos no final
    inicia() {
      this.cliqueBotoes()
      this.pressionaEnter()
    },

    cliqueBotoes() {
      // Listener dos botões
      document.addEventListener('click', (e) => {
        const element = e.target
        // Captura o valor dos botões clicados e chama a função que envia o texto capturado pra o input
        if (element.classList.contains('btn-num')) {
          this.btnParaDisplay(element.innerText)
        }
        // Limpa o input
        if (element.classList.contains('btn-clear')) {
          this.clearDisplay()
        }
        // Apaga ultimo numero
        if (element.classList.contains('btn-del')) {
          this.apagaUm()
        }
        // Resultado
        if (element.classList.contains('btn-eq')) {
          this.realizaConta()
        }
      }) // .bind(this) o this do document e coloca pra função calculadora, no caso coloca pra quem chamou
      // Ou pode usar arrow function, mas nn poderá usar o this do document, pois será o this de quem chamou
    },
    // Envia o valor capturado no listener dos botões para o input
    btnParaDisplay(valor) {
      this.display.value += valor
    },
    // Limpa o input
    clearDisplay() {
      this.display.value = ''
      this.display.focus()
    },
    // Apaga o ultimo número
    apagaUm() {
      this.display.value = this.display.value.slice(0, -1) // O 0 é o tamanho da string e em seguida corta um número, neste caso o ultimo digitado
    },
    // FAZ A OPERAÇÃO DO RESULTADO
    // FUNCTION PRINCIPAL ↓↓↓↓↓↓↓↓↓↓↓↓
    realizaConta() {
      /* A função eval é muito perigosa, pois ela pega oque tiver dentro e tenta executar no motor do javascript
        seja um simples alert ou até qualquer codigo */
      let conta = this.display.value
      try {
        conta = eval(conta) // Vai pegar oque esta dentro do input e o motor do javascript vai executar como codigo javascript por conta do eval e armazenar na propia variavel CONTA
        // Se for algo diferente de uma conta, retornará um alert
        if (!conta) {
          alert('Conta inválida')
          return
        }
        // Caso de tudo certo, irá executar a conta
        // FUNCTION PRINCIPAL ↓↓↓↓↓↓↓↓↓↓↓↓
        else {
          this.display.value = String(conta)
        }
      } catch (error) {
        alert('Conta inválida')
        return
      }
    },
    // Enviar com enter
    pressionaEnter() {
      this.display.addEventListener('keyup', (e) => {
        // Foi usado arrow function pra nn perder o this
        if (e.keyCode === 13) {
          this.realizaConta()
        }
      })
    },
  }
}
const calculadora = criaCalculadora()
// Inicia a calculdaora
calculadora.inicia()
