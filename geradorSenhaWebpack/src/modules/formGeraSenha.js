import geraSenha from './geradores'

// Seletores dos elementos HTML
const resultado = document.querySelector('.resultado')
const qtde = document.querySelector('.qtdeCaracteres')
const checkMaisculas = document.querySelector('.checkMaisculas')
const checkMinisculas = document.querySelector('.checkMinisculas')
const checkNumeros = document.querySelector('.checkNumeros')
const checkSimbolos = document.querySelector('.checkSimbolos')
const botaoGerarSenha = document.querySelector('.gerarSenha')

/**
 * Configura o comportamento do botão de gerar senha.
 * Ao clicar no botão, gera uma senha com base nas opções selecionadas e exibe o resultado.
 */
export default function () {
  botaoGerarSenha.addEventListener('click', () => {
    resultado.innerHTML = gera()
  })
}

/**
 * Gera a senha com base nas opções selecionadas pelos checkboxes.
 * @returns {string} Senha gerada ou mensagem de aviso se nada estiver selecionado.
 */
function gera() {
  const senha = geraSenha(
    qtde.value,
    checkMaisculas.checked,
    checkMinisculas.checked,
    checkNumeros.checked,
    checkSimbolos.checked
  )
  return senha || 'Nada selecionado'
}
