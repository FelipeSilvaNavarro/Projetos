const Login = require('../models/loginModel')
exports.index = (req, res) => {
    res.render('login')
}
exports.register = async function (req, res) {
    try {
        const login = new Login(req.body)
        await login.register()
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            // Salvando pra retornar pra pag de login
            req.session.save(function () {
                return res.redirect('/login/index') // Volta pra pagina do login assim que ve um erro
            })
            return
        }
        req.flash('success', 'Usuario criado com sucesso')
        req.session.save(function () {
            return res.redirect('/login/index')
        })
    } catch (e) {
        console.error(e)
        return res.render('404')
    }

}