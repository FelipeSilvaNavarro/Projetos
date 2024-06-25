/*
    705.484.450-52 <- Os dois ultimos dígitos é uma soma dos 9 digitos anteriores
    705.484.450-52 070.987.720-03

    7x 0x 5x 4x 8x 4x 4x 5x 0x
    10 9  8  7  6  5  4  3  2
    70 0  40 28 48 20 16 15 0 = 237

    (Formula) 11 - (237 % 11) = 5 (Primeiro dígito) <- Não pode ser maior que 9, se for maior que 9, é 0
    Começa de 11 e inclui o 10 digito, no caso esse primeiro digito novo

    7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
    11 10 9  8  7  6  5  4  3  2 
    77 0  45 32 56 24 20 20 0 10 = 284
    Da pra fzr a conta total com reduce
    11 - (284 % 11) = 2 (Segundo digito) <- Não pode ser maior que 9, se for maior que 9, é 0

    Ao final concatena os 9 digitos com os novos 2 digitos
    Ao final comparar se é um CPF válido

    705.484.450-52 === 705.484.450-52 <- O primeiro CPF é o da conta q foi feita
*/
/**
 * Classe responsável pela validação de CPF.
 * @param {string} cpf O CPF que será validado.
 */
function ValidaCpf(cpf) {
  /**
   * Função interna para validar a entrada do CPF.
   * @returns {boolean} Retorna true se o CPF estiver no formato correto.
   */
  function cpfCorretamenteEnviado() {
    // Verifica se o CPF é uma string válida e possui 11 dígitos numéricos.
    // Tem que ser acima e em uma função por conta da hierarquia do replace, em outro lugar o replace não vai ser executado como função
    if (
      typeof cpf === 'undefined' ||
      typeof cpf !== 'string' ||
      cpf.replace(/\D+/g, '').length !== 11 // Mesmo fazendo o replace 2x, é necessario por conta da hieraquia...
    ) {
      console.log('Erro na inserção de dados')
      return false
    } else {
      return true
    }
  }

  // Se o CPF foi enviado corretamente, define a propriedade limpaCpf.
  // Get do cpf e limpar tudo que não é numero da string recebida
  if (cpfCorretamenteEnviado() === true) {
    Object.defineProperty(this, 'limpaCpf', {
      enumerable: true,
      get() {
        return cpf.replace(/\D+/g, '') // Remove todos os caracteres não numéricos.
      },
    })
  }
}

/**
 * Método no prototype para validar o CPF.
 * @returns {boolean} Retorna true se os dois ultimos dígitos do CPF for validos
 */
// Function principal.
ValidaCpf.prototype.valida = function () {
  // Variavel criada pois irá precisar do cpfParcial mais de 1 vez
  const cpfParcial = this.limpaCpf.slice(0, -2) // Extrai os primeiros 9 dígitos do CPF.
  const digito1 = this.criaDigitoEmArray(cpfParcial) // Calcula o primeiro dígito verificador.
  const digito2 = this.criaDigitoEmArray(cpfParcial + digito1) // Calcula o segundo dígito verificador.
  const novoCpf = cpfParcial + digito1 + digito2 // Concatena os dígitos para formar o CPF completo.
  return novoCpf === this.limpaCpf // Verifica se o CPF calculado é igual ao CPF fornecido.
}

/**
 * Método no prototype para criar os dígitos verificadores do CPF.
 * @param {string} cpfParcial Os primeiros 9 e depois 10 dígitos do CPF.
 * @returns {string} Retorna o dígito verificador calculado.
 */
ValidaCpf.prototype.criaDigitoEmArray = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial) // Converte a string recebida em um array.
  let fatorial = cpfArray.length + 1 // Precisa ser let pois a cada rodada, ta mudando diretamente a variavel na linha 89
  // O +1 é por conta que o fatorial precisa começar com 10, e o array tem 9 digitos, que é o CPF -2

  // O reduce já esta jogando pra dentro do digito
  // Calculo principal da fatoriação
  // Calcula o total com base na fórmula do CPF.
  const total = cpfArray.reduce(function (acumulador, valor) {
    // CALCULO PRINCIPAL DA FATORIAÇÃO ↓↓↓↓↓
    acumulador += fatorial * Number(valor) // Multiplica e acumula os valores.
    // O valor é uma string, por isso precisa transformar em Number, mesmo o motor do JS fazendo a conta independente
    fatorial-- // Para em 9 pois começa de 10 e anda 9 digitos por conta do length do array que são 9 digitos
    return acumulador
  }, 0) // Inicia o acumulador em 0.

  const digito = 11 - (total % 11) // Calcula o dígito com base na fórmula.
  return digito > 9 ? '0' : String(digito) // Se o dígito for maior que 9, retorna '0', caso contrário retorna o dígito.
}
// Exemplo de uso da classe ValidaCpf.
const cpf = new ValidaCpf('09439327421')
if (cpf.valida()) {
  console.log('cpf válido')
} else {
  console.log('cpf inválido')
}
