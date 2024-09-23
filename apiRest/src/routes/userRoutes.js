import { Router } from 'express'
import UserController from '../controllers/UserController'
const router = new Router()
router.post('/', UserController.store)
router.get('/', UserController.index)
router.get('/:id', UserController.show)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)
export default router

/* Nome normais dos métodos pra users
É espero em cada controller até 5 métodos
index -> lista todos os usuarios | GET
store/create -> cria um novo usuario | POST
delete -> apaga um usuario | DELETE
show -> mostra um usuario | GET
update -> atualiza um usuario | PATCH ou PUT
*/