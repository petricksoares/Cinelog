const express = require('express')
const router = express.Router()
const filmesController = require('../controllers/filmesController')
const { autenticar } = require('../middleware/auth')

router.get('/', autenticar, filmesController.listar)
router.get('/:id', autenticar, filmesController.buscarPorId)
router.post('/', autenticar, filmesController.criar)
router.put('/:id', autenticar, filmesController.atualizar)
router.delete('/:id', autenticar, filmesController.deletar)

module.exports = router