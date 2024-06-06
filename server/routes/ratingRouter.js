const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, ratingController.create)
router.get('/:deviceId', ratingController.getAverageRating)
router.put('/', authMiddleware, ratingController.update)
router.get('/user/:deviceId/:userId', authMiddleware, ratingController.getUserRating)

module.exports = router