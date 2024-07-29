const Contato = require('../models/contatoModel')
exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    })
}
exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'))
            return
        }
        req.flash('success', 'Contato cadastrado')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    } catch (e) {
        console.log(e);
        return res.render('404')

    }

}
exports.editIndex = async function (req, res) {
    // Se o parâmetro do id do contato não for enviado, retorna um 404
    if (!req.params.id) return res.render('404')

    const contato = await Contato.buscaPorId(req.params.id)

    // Renderiza a página se o contato existir
    if (!contato) return res.render('404')

    res.render('contato', { contato })
}
exports.edit = async function (req, res) {
    if (!req.params.id) return res.render('404')
    const contato = new Contato(req.body)
    await contato.edit(req.params.id)

    try {
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect(req.get('referer'))) // referer é a msm coisa do back
            return
        }
        req.flash('success', 'Contato editado')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    } catch (e) {
        console.log(e)
        res.render('404')
    }

}