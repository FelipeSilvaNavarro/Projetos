/**
 * Importa e inicializa os módulos de Login e contato para as páginas de cadastro e login.
 * O módulo `Login` e `Cadastro` é utilizado para gerenciar a autenticação do usuário.
 * O código instancia o módulo `Login` e cadastro para os formulários de cadastro e login e os inicializa.
 */

import 'core-js/stable' // Importa polyfills para garantir compatibilidade com navegadores antigos
import 'regenerator-runtime/runtime' // Importa suporte para geradores e async/await
import Login from './modules/Login' // Importa o módulo de Login para gerenciamento de autenticação
import Contato from './modules/Contato'
// Instancia o módulo Login para o formulário de cadastro
const cadastro = new Login('.form-cadastro')
// Instancia o módulo Login para o formulário de login
const login = new Login('.form-login')
// Instancia o módulo Contato para o formulário da criação de um novo contato
const editaContato = new Contato('.form-novo-contato')
// Instancia o módulo Contato para o formulário da edição de um contato
const novoContato = new Contato('.form-edita-contato')
// Inicializa o módulo de login
login.init()
// Inicializa o módulo de cadastro
cadastro.init()
// Inicializa o módulo da criação de contato
novoContato.init()
// Inicializa o módulo de edição de contato
editaContato.init()