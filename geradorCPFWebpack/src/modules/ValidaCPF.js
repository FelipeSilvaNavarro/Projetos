/**
 * Classe responsável pela validação de CPF.
 */
export default class ValidaCPF {
  /**
   * @param {string} cpfEnviado - O CPF que será validado.
   */
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'limpaCpf', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ''),
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
    const cpfSemDigitos = this.limpaCpf.slice(0, -2)
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos)
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1)
    this.novoCPF = cpfSemDigitos + digito1 + digito2
  }

  /**
   * Método estático para gerar os dígitos verificadores do CPF.
   * @param {string} cpfSemDigitos - Os primeiros 9 e 10 dígitos do CPF.
   * @returns {string} - Retorna o dígito verificador calculado.
   */
  static geraDigito(cpfSemDigitos) {
    let total = 0
    let fatorial = cpfSemDigitos.length + 1

    for (let stringNumericaCpf of cpfSemDigitos) {
      total += fatorial * Number(stringNumericaCpf)
      fatorial--
    }

    const digito = 11 - (total % 11)
    return digito <= 9 ? String(digito) : '0'
  }

  /**
   * Método para validar o CPF.
   * @returns {boolean} - Retorna true se o CPF for válido.
   */
  valida() {
    if (!this.limpaCpf) return false
    if (typeof this.limpaCpf !== 'string') return false
    if (this.limpaCpf.length !== 11) return false
    if (this.isSequência()) return false
    this.geraNovoCpf()

    return this.novoCPF === this.limpaCpf
  }
}
