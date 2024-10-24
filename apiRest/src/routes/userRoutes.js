import { Router } from 'express'
import UserController from '../controllers/UserController'
import loginRequired from '../middlewares/loginRequired'
const router = new Router()
// Não deveria existir, a não ser que queira um sistema onde mostra o perfil do usuario
router.get('/', loginRequired, UserController.index) // Lista usuarios
router.get('/:id', UserController.show) // Lista usuario
router.post('/', UserController.store)
router.put('/', loginRequired, UserController.update)
router.delete('/', loginRequired, UserController.delete)
export default router

/* Nome normais dos métodos pra users
É espero em cada controller até 5 métodos
index -> lista todos os usuarios | GET
store/create -> cria um novo usuario | POST
delete -> apaga um usuario | DELETE
show -> mostra um usuario | GET
update -> atualiza um usuario | PATCH ou PUT
*/