/**
 * Classe responsável pela validação de CPF.
 */
class ValidaCPF {
  /**
   * @param {string} cpfEnviado - O CPF que será validado.
   */
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'limpaCpf', {
      writable: false,
      enumerable: true,
      configurable: false,
      // Seria o GETTER, mas somente o value é suficiente e eficiente
      value: cpfEnviado.replace(/\D+/g, ''), // Remove todos os caracteres não numéricos.
    })
  }

  /**
   * Verifica se o CPF é uma sequência de números iguais repetidos.
   * @returns {boolean} Retorna true se o CPF for uma sequência.
   */
  isSequência() {
    return (
      this.limpaCpf.charAt(0).repeat(this.limpaCpf.length) === this.limpaCpf
    )
  }

  /**
   * Gera um novo CPF para comparar com base nos dígitos calculados.
   */
  geraNovoCpf() {
    const cpfSemDigitos = this.limpaCpf.slice(0, -2) // Extrai os primeiros 9 dígitos do CPF.
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos) // Calcula o primeiro dígito verificador.
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1) // Calcula o segundo dígito verificador.
    this.novoCPF = cpfSemDigitos + digito1 + digito2 // Concatena os dígitos para formar o CPF completo.
  }

  /**
   * Método estático para gerar os dígitos verificadores do CPF.
   * @param {string} cpfSemDigitos - Os primeiros 9 e 10 dígitos do CPF.
   * @returns {string} - Retorna o dígito verificador calculado.
   */
  static geraDigito(cpfSemDigitos) {
    // É estatica pois não usa o 'THIS' então não precisa de nada da instancia
    let total = 0
    let fatorial = cpfSemDigitos.length + 1
    // Precisa ser let pois a cada rodada, ta mudando diretamente a variavel na linha 89
    // O +1 é por conta que o fatorial precisa começar com 10, e o array tem 9 digitos, que é o CPF -2

    // Calcula o total com base na fórmula do CPF.
    for (let stringNumericaCpf of cpfSemDigitos) {
      total += fatorial * Number(stringNumericaCpf) // Multiplica e acumula os valores.
      fatorial-- // Para em 9 pois começa de 10 e anda 9 digitos por conta do length do array que são 9 digitos
    }

    const digito = 11 - (total % 11) // Calcula o dígito com base na fórmula.
    return digito <= 9 ? String(digito) : '0' // Se o dígito for maior que 9, retorna '0', caso contrário retorna o dígito.
  }

  /**
   * Método para validar o CPF.
   * @returns {boolean} - Retorna true se o CPF for válido.
   */
  valida() {
    // Verifica se o CPF é uma string válida e possui 11 dígitos numéricos.
    if (!this.limpaCpf) return false // Verifica se o CPF está limpo.
    if (typeof this.limpaCpf !== 'string') return false // Verifica se o CPF é uma string.
    if (this.limpaCpf.length !== 11) return false // Verifica se o CPF tem 11 dígitos.
    if (this.isSequência()) return false // Verifica se o CPF é uma sequência de números iguais repetidos.
    this.geraNovoCpf() // Puxa / Gera um novo CPF da função acima para comparação.

    return this.novoCPF === this.limpaCpf // Verifica se o CPF calculado é igual ao CPF fornecido.
  }
}
