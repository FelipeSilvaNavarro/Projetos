const p = document.querySelector('p')
const btn = document.querySelector('.adicionar')
const input = document.querySelector('.campo')
const ul = document.querySelector('.tarefas')

// @returns li
function criaLi() {
  const li = document.createElement('li')
  li.setAttribute('class', 'tarefa')
  return li
}

function limpaCampo() {
  input.value = ''
  input.focus()
}

// @returns button
function criaButton() {
  const button = document.createElement('button')
  return button
}

// @returns button
function criaBotaoApagarTarefa(li) {
  const btn = criaButton()
  const txtBtn = document.createTextNode('X')
  btn.appendChild(txtBtn)
  li.appendChild(btn) // Adiciona o BOTÃO NO FIM da tarefa
  btn.setAttribute('id', 'btnApagar')
  btn.setAttribute('class', 'btnApagar')
  return btn
}

/* TODO 
  - Falta arrumar o botão
*/
// @returns button
function criaBotaoApagarTodasTarefas(p) {
  if (!document.querySelector('#btnApagarTudo')) {
    const btnApagarTudo = criaButton()
    const txtBtn = document.createTextNode('Apagar tudo')
    btnApagarTudo.appendChild(txtBtn)
    p.appendChild(btnApagarTudo)
    btnApagarTudo.setAttribute('id', 'btnApagarTudo')
    btnApagarTudo.setAttribute('class', 'btnApagarTudo')
    return btnApagarTudo
  } else {
    return ''
  }
}

// Listeners dos botões | APAGA um LI e APAGA a UL
document.addEventListener('click', function (e) {
  const element = e.target
  if (element.id === 'btnApagar') {
    element.parentElement.remove()
    atualizaJSON()
  }
  if (element.id === 'btnApagarTudo') {
    ul.innerHTML = ''
  }
})

// Mantem as tarefas
function atualizaJSON() {
  const liTarefas = ul.querySelectorAll('li')
  const listaTarefas = []
  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText
    tarefaTexto = tarefaTexto.replace('X', '')
    listaTarefas.push(tarefaTexto)
  }
  const tarefasJSON = JSON.stringify(listaTarefas)
  localStorage.setItem('tarefas', tarefasJSON)
}

// Puxa as tarefas quando abre o arquivo
function adicionaTarefasSalva() {
  const tarefas = localStorage.getItem('tarefas')
  const listaTarefas = JSON.parse(tarefas)

  for (let tarefa of listaTarefas) {
    criaTarefa(tarefa)
  }
}

// Function PRINCIPAL
function criaTarefa(tarefa) {
  const li = criaLi()
  li.innerHTML = tarefa
  ul.appendChild(li) // Adiciona / cria a lista de tarefas
  criaBotaoApagarTarefa(li) // Coloca o botão APAGAR FUNCIONAL no final da tarefa
  // Colocar o botão APAGAR TODOS FUNCIONAL no final das tarefas
  limpaCampo()
  atualizaJSON()
}

// Enviar com clique
btn.addEventListener('click', function () {
  if (input.value === '') return
  criaTarefa(input.value)
})

// Enviar com ENTER
input.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (input.value === '') return
    criaTarefa(input.value)
  }
})

// Chama a funçao que puxa as tarefas salvas no JSON localstorage
adicionaTarefasSalva()
