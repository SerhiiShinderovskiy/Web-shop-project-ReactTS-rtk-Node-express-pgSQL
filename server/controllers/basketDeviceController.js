const {Basket, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketDeviceController {
    async create(req, res, next) {
        try {
            const { userId, deviceId, deviceName } = req.body;
            let basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                basket = await Basket.create({ userId });
            }
            const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId, deviceName });
            return res.json(basketDevice);
        } catch (error) {
            return next(ApiError.internal('Помилка під час створення запису кошика', error));
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.params; 
            console.log('Fetching basket for user ID:', userId);
            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                console.log('Basket not found for user ID:', userId);
                return res.status(404).json({ message: 'Кошик не знайдений для цього користувача' });
            }
            const basketDevices = await BasketDevice.findAll({ where: { basketId: basket.id } });
            console.log('Found basket devices:', basketDevices);
            return res.json(basketDevices);
        } catch (error) {
            console.error('Error fetching basket devices:', error);
            return next(ApiError.internal('Помилка під час отримання записів кошика', error));
        }
    }

    async remove(req, res, next) {
        try {
            const { userId, deviceId } = req.body;
            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return res.status(404).json({ message: 'Кошик не знайдений для цього користувача' });
            }

            const deletedRows = await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } });
            if (deletedRows === 0) {
                return res.status(404).json({ message: 'Девайс не знайдений у кошику' });
            }
            
            return res.json({ message: 'Девайс успішно видалений з кошика' });
        } catch (error) {
            return next(ApiError.internal('Помилка під час видалення девайсу з кошика', error));
        }
    }
}

module.exports = new BasketDeviceController()