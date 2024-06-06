const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params;
            const brand = await Brand.findByPk(id);
            if (!brand) {
                return next(ApiError.notFound('Бренд не знайдений'));
            }
            await brand.destroy();
            return res.json({message: 'Бренд успішно видалений'});
        } catch (error) {
            return next(ApiError.internal('Помилка під час видалення бренду', error));
        }
    }
}
module.exports = new BrandController