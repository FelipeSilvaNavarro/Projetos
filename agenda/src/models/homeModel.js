const mongoose = require('mongoose');
const HomeSchema = new mongoose.Schema({
  titulo: { type: String, required: true }, // O titulo se torna requerido para ser enviado ao colocar o required
  descricao: { type: String },
});
const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;
