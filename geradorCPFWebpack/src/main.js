import GeraCPF from './modules/GeraCPF'
import './assets/css/style.css'

/**
 * Função auto-invocada para gerar e exibir um novo CPF.
 *
 * Essa function é executado imediatamente após a pagina ser carregada. Ele instancia a classe GeraCPF para gerar CPFs válidos e
 * adiciona um evento ao botão "Gerar" que atualiza o conteúdo da div com a classe "resultado" com um novo CPF gerado
 * toda vez que o botão é clicado.
 */
;(function () {
  const geradorCPF = new GeraCPF()
  const resultado = document.querySelector('.resultado')
  const botaoGerar = document.getElementById('gerarCPF')
  botaoGerar.addEventListener('click', () => {
    resultado.textContent = geradorCPF.geraNovoCpf()
  })
})()
