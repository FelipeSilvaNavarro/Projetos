/**
 * Define middlewares para aplicação, incluindo gerenciamento de erros, proteção CSRF e verificação de autenticação de usuário.
 * O middleware global injeta erros, mensagens de sucesso e usuário na resposta. 
 * O middleware de CSRF adiciona um token CSRF às respostas para proteger contra ataques CSRF.
 * O middleware de autenticação verifica se o usuário está autenticado e redireciona para a página inicial se não estiver.
 */

// Middleware global para injeção de mensagens e dados
exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors') // Captura erros e injeta na página, interage com o módulo flash
  res.locals.success = req.flash('success') // Captura mensagens de sucesso
  res.locals.user = req.session.user // Injeta o usuário atual na resposta
  next() // Chama o próximo middleware
}

// Middleware para checar erros de CSRF
exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    // Se ocorrer qualquer erro, renderiza a página 404
    return res.render('404') // Renderiza a página 404 para erros de CSRF
  }
  next() // Chama o próximo middleware
}

// Middleware para adicionar o token CSRF a todas as páginas
exports.CsrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken() // Adiciona o token CSRF à resposta, interage com o módulo CSRF
  next() // Chama o próximo middleware
}

// Middleware para verificar se o usuário está autenticado
exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    // Se o usuário não estiver logado, redireciona para a página inicial
    req.flash('errors', 'Você precisa fazer login') // Adiciona mensagem de erro na sessão
    req.session.save(() => res.redirect('/')) // Salva a sessão antes do redirecionamento
    return // Interrompe a execução do middleware
  }
  next() // Chama o próximo middleware se o usuário estiver autenticado
}
