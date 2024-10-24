import { Sequelize } from "sequelize"
import databaseConfig from "../config/database"
import Aluno from "../models/Aluno"
import User from "../models/User"
import Foto from "../models/Foto"
const models = [ Aluno, User, Foto ] // Array com todos os models
const connection = new Sequelize(databaseConfig)
models.forEach(model => model.init(connection)) // Percorre o array com todos os models
models.forEach(model => model.associate && model.associate(connection.models)) // Checar se o model tem o método estatico 'associate'