exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors') // Capturando os erros e injetando dentro da pagina
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}
exports.middlewareSec = (req, res, next) => {
    next()
}
// Previnindo o erro de vazar pra tela do user
exports.checkCsrfError = (err, req, res, next) => {
    if (err) { // Caso aconteca literalmente qualquer erro, ele nn vai pra frente
        return res.render('404')
    }
    next()
}
// Enviar para todas as paginas um CsrfToken
exports.CsrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}
exports.loginRequired = (req, res, next) => {
    if (!req.session.user) { // User nn logado
        req.flash('errors', 'Você precisa fazer login')
        // Sempre que for redirecionar a pagina, é importante salvar a sessão pra garantir q ela foi salva
        req.session.save(() => res.redirect('/'))
        return
    }
    next()
}