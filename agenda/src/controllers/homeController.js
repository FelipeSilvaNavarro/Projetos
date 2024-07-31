const Contato = require('../models/contatoModel');
exports.index = async function (req, res) {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos }); // Envia um objeto contendo os contatos
};
