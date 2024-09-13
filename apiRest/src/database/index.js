import { Sequelize } from "sequelize"
import databaseConfig from "../config/database"
import Aluno from "../models/Aluno"
const models = [ Aluno ] // Array com todos os models
const connection = new Sequelize(databaseConfig)
models.forEach(model => model.init(connection)) // Percorre o array com todos os models