exports.middlewareGlobal = (req, res, next) => {
    res.locals.varRes = 'Value de todos os RES' // Esta disponivel em todas as paginas pois jogou em um middleware sem rotas (server.js ln 33)
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