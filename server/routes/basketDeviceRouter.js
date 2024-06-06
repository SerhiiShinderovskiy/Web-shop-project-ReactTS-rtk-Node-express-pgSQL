const Router = require('express')
const router = new Router()
const basketDeviceController = require('../controllers/basketDeviceController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketDeviceController.create)
router.get('/:userId', authMiddleware, basketDeviceController.getAll)
router.delete('/', authMiddleware, basketDeviceController.remove)

module.exports = router