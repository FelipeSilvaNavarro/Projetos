/**
 * Controladores para o modelo de Login, incluindo rotas para visualização de login, registro, autenticação e logout.
 * O controlador `index` exibe a página de login ou a página de usuário logado com base na sessão.
 * O controlador `register` registra um novo usuário, lidando com erros e mensagens de sucesso.
 * O controlador `login` autentica um usuário, gerencia erros e salva informações de sessão.
 * O controlador `logout` encerra a sessão do usuário e redireciona para a página inicial.
 */

const Login = require('../models/loginModel') // Interage com o modelo de Login para operações de autenticação e registro

/**
 * Renderiza a página de login ou a página de usuário logado.
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto da resposta.
 */
exports.index = (req, res) => {
  if (req.session.user) {
    return res.render('login-logado') // Se estiver logado, renderiza a página para usuário logado
  }
  return res.render('login') // Caso contrário, renderiza a página de login
}

/**
 * Registra um novo usuário, lidando com erros e mensagens de sucesso.
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto da resposta.
 */
exports.register = async function (req, res) {
  try {
    const login = new Login(req.body) // Cria uma nova instância do modelo Login
    await login.register() // Tenta registrar o novo usuário
    if (login.errors.length > 0) {
      req.flash('errors', login.errors) // Adiciona erros à sessão

      // `req.session.save()` é necessário para garantir que as alterações na sessão sejam persistidas
      // antes de redirecionar para outra página. Isso garante que as mensagens de erro
      // estejam disponíveis na próxima requisição.
      req.session.save(() => {
        return res.redirect('/login/index') // Redireciona para a página de login após salvar a sessão
      })
      return
    }
    req.flash('success', 'Usuário criado com sucesso')
    req.session.save(() => {
      return res.redirect('/login/index') // Redireciona para a página de login após sucesso e salvar a sessão
    })
  } catch (e) {
    console.error(e) // Loga o erro no console
    return res.render('404') // Renderiza página de erro 404
  }
}

/**
 * Autentica um usuário, gerencia erros e salva informações de sessão.
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto da resposta.
 */
exports.login = async function (req, res) {
  try {
    const login = new Login(req.body) // Cria uma nova instância do modelo Login
    await login.login() // Tenta autenticar o usuário
    if (login.errors.length > 0) {
      req.flash('errors', login.errors) // Adiciona erros à sessão

      // `req.session.save()` é necessário para garantir que as alterações na sessão sejam persistidas
      // antes de redirecionar para outra página. Isso garante que as mensagens de erro
      // estejam disponíveis na próxima requisição.
      req.session.save(() => {
        return res.redirect('/login/index') // Redireciona para a página de login em caso de erro após salvar a sessão
      })
      return
    }
    req.flash('success', 'Logado')
    req.session.user = login.user // Salva as informações do usuário na sessão

    req.session.save(() => {
      return res.redirect('/login/index') // Redireciona para a página de login após sucesso e salvar a sessão
    })
  } catch (e) {
    console.error(e) // Loga o erro no console
    return res.render('404') // Renderiza página de erro 404
  }
}

/**
 * Encerra a sessão do usuário e redireciona para a página inicial.
 * @param {Object} req - Objeto da requisição.
 * @param {Object} res - Objeto da resposta.
 */
exports.logout = (req, res) => {
  req.session.destroy() // Remove a sessão do usuário
  res.redirect('/') // Redireciona para a página inicial
}
