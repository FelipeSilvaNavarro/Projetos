/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // Transformando em FK
        references: {
          model: 'alunos',
          key: 'id'
        },
        // Oque acontecerá com o registro inteiro quando um aluno ser apagado, pois as fotos devem ser deletadas junta
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
      ,
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('fotos')
  }
}
