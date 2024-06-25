import ValidaCPF from './ValidaCpf'

/**
 * Classe responsável por gerar números de CPF válidos.
 */
export default class GeraCPF {
  /**
   * Gera uma sequência de 9 números aleatórios.
   *
   * @param {number} min - O valor mínimo que pode ser gerado.
   * @param {number} max - O valor máximo que pode ser gerado.
   * @returns {string} Uma string de 9 dígitos aleatórios.
   */
  rand(min = 100000000, max = 999999999) {
    return String(Math.floor(Math.random() * (max - min) + min))
  }

  /**
   * Formata um CPF adicionando pontos e hífen.
   *
   * @param {string} cpf - A string do CPF sem formatação.
   * @returns {string} A string do CPF formatada (ex: 123.456.789-00).
   */
  formataCpf(cpf) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9, 11)}`
  }

  /**
   * Gera um CPF novo e válido. Primeiro, gera 9 dígitos aleatórios, depois calcula os 2 dígitos verificadores.
   * Utiliza a função estática geraDigito da classe ValidaCPF para calcular os dígitos verificadores.
   *
   * @returns {string} Um CPF novo e formatado.
   */
  geraNovoCpf() {
    const cpfSemDigito = this.rand()
    const digito1 = ValidaCPF.geraDigito(cpfSemDigito)
    const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1)
    const novoCpf = cpfSemDigito + digito1 + digito2
    return this.formataCpf(novoCpf)
  }
}
