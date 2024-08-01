/**
 * Importa e inicializa os módulos de Login para as páginas de cadastro e login.
 * O módulo `Login` é utilizado para gerenciar a autenticação do usuário.
 * O código instancia o módulo `Login` para os formulários de cadastro e login e os inicializa.
 */

import 'core-js/stable' // Importa polyfills para garantir compatibilidade com navegadores antigos
import 'regenerator-runtime/runtime' // Importa suporte para geradores e async/await
import Login from './modules/Login' // Importa o módulo de Login para gerenciamento de autenticação

// Instancia o módulo Login para o formulário de cadastro
const cadastro = new Login('.form-cadastro')
// Instancia o módulo Login para o formulário de login
const login = new Login('.form-login')

// Inicializa o módulo de login
login.init()
// Inicializa o módulo de cadastro
cadastro.init()
