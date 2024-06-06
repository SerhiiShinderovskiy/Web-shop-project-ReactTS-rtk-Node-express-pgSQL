const {Basket, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketConstroller {
    async addOne(req, res, next) {
        try {
            const {userId, deviceId} = req.body;
            if (!userId || !deviceId) {
                return next(ApiError.badRequest('Неправильний запит. Будь ласка, надішліть userId та deviceId.'));
            }
            let basket = await Basket.findOne({where: {userId}});
            if (!basket) {
                basket = await Basket.create({userId});
            }
            await BasketDevice.create({basketId: basket.id, deviceId});
            return res.json({message: 'Товар успішно доданий до кошика'});
        } catch (error) {
            return next(ApiError.internal('Помилка під час додавання товару до кошика', error));
        }
    }
}

module.exports = new BasketConstroller()