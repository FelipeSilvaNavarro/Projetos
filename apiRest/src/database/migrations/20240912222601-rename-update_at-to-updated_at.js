module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('alunos', 'update_at', 'updated_at');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('alunos', 'updated_at', 'update_at');
  }
}