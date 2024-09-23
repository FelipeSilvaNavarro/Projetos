import Sequelize, { Model } from "sequelize"
import bcryptjs from 'bcryptjs'
export default class User extends Model {
  static init (sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [ 3, 255 ],
            // Isso esta sendo feito pra gerar o propio erro e retornar ao usuario caso os campos não sejam preenchidos corretamente
            msg: 'Campo nome deve ter entre 3 e 255 caracteres'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email ja existe'
        },
        validate: {
          isEmail: {
            msg: 'Email inválido'
          }
        }
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            // TODOO: Colocar as mesmas regras de validações do campo senha do projeto agenda aqui
            args: [ 3, 255 ],
            msg: 'A senha precisa ter entre  3 e 255 caracteres'
          }
        }
      }
    }, {
      sequelize,
    })
    this.addHook('beforeSave', async user => {
      if (user.password) user.password_hash = await bcryptjs.hash(user.password, 8)
    })
    return this
  }
}