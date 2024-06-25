/**
 * Define os símbolos que podem ser utilizados na geração de senha.
 * @type {string}
 */
const simbolos = ',.;/]~[]{}()-*+@$%'

/**
 * Gera um número aleatório dentro de um intervalo específico.
 * @param {number} min - Valor mínimo do intervalo.
 * @param {number} max - Valor máximo do intervalo.
 * @returns {number} Número aleatório gerado.
 */
const aleatorio = (min, max) => Math.floor(Math.random() * (max - min) + min)

// Geradores
/**
 * Gera uma letra maiúscula aleatória.
 * @returns {string} Letra maiúscula gerada.
 */
const geraMaiscula = () => String.fromCharCode(aleatorio(65, 91))

/**
 * Gera uma letra minúscula aleatória.
 * @returns {string} Letra minúscula gerada.
 */
const geraMinuscula = () => String.fromCharCode(aleatorio(97, 123))

/**
 * Gera um número aleatório.
 * @returns {string} Número gerado.
 */
const geraNumero = () => String.fromCharCode(aleatorio(48, 58))

/**
 * Gera um símbolo aleatório a partir da string 'simbolos'.
 * @returns {string} Símbolo gerado.
 */
const geraSimbolos = () => simbolos[aleatorio(0, simbolos.length)]

/**
 * Gera uma senha com base nos parâmetros fornecidos.
 * @param {number} qtde - Quantidade de caracteres da senha a ser gerada.
 * @param {boolean} maisculas - Se inclui letras maiúsculas na senha.
 * @param {boolean} minusculas - Se inclui letras minúsculas na senha.
 * @param {boolean} numeros - Se inclui números na senha.
 * @param {boolean} simbolos - Se inclui símbolos na senha.
 * @returns {string} Senha gerada.
 */
export default function geraSenha(
  qtde,
  maisculas,
  minusculas,
  numeros,
  simbolos
) {
  const senhaArray = []
  qtde = Number(qtde) // Converte a quantidade para número, caso não seja

  // Loop para gerar a senha
  for (let i = 0; i < qtde; i++) {
    // Inclui caracteres no array de senha baseado nos parâmetros selecionados
    maisculas && senhaArray.push(geraMaiscula())
    minusculas && senhaArray.push(geraMinuscula())
    numeros && senhaArray.push(geraNumero())
    simbolos && senhaArray.push(geraSimbolos())
  }

  // Junta os caracteres do array em uma string e limita ao tamanho especificado (qtde)
  // Foi usado o slice por conta que a cada volta, o array da senha era duplicado, e o join é pra converter em array
  return senhaArray.join('').slice(0, qtde)
}
