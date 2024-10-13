const bcryptjs = require('bcryptjs')

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        nome: 'Carlos',
        email: 'carlos@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date()
      }, {
        nome: 'Carlos2',
        email: 'carlos2@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date()
      }, {
        nome: 'Carlos3',
        email: 'carlos3@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
  )

  },

  async down () { }
}
