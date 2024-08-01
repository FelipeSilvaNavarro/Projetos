/**
 * Define o modelo de Home e as operações relacionadas, utilizando Mongoose para interagir com o banco de dados MongoDB.
 * O modelo inclui campos para título e descrição do home.
 * Campos do modelo incluem título e descrição.
 */

// Imports
const mongoose = require('mongoose')

// Definição do esquema do modelo Home no Mongoose
const HomeSchema = new mongoose.Schema({
  titulo: { type: String, required: true }, // O título é um campo obrigatório
  descricao: { type: String }, // Descrição é um campo opcional
})

// Criação do modelo Home no Mongoose
const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel
