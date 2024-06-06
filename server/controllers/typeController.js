const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async remove(req, res, next) {
        try {
            const {id} = req.body;
            const type = await Type.findByPk(id);
            if (!type) {
                return next(ApiError.notFound('Тип не знайдений'));
            }
            await type.destroy();
            return res.json({ message: 'Тип успішно видалений' });
        } catch (error) {
            return next(ApiError.internal('Помилка під час видалення типу', error));
        }
    }
}
module.exports = new TypeController()