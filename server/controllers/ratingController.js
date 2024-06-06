const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')

class RatingController {
    async create(req, res, next) {
        try {
            const { deviceId, name, userId } = req.body; 

            const existingRating = await Rating.findOne({ where: { userId, deviceId } });
            if (existingRating) {
                return next(ApiError.badRequest('Ви вже виставили рейтинг цьому товару'));
            }

            const rating = await Rating.create({ userId, deviceId, name });
            return res.json(rating);
        } catch (error) {
            return next(ApiError.internal('Помилка під час створення рейтингу', error));
        }
    }

    async getAverageRating(req, res, next) {
        try {
            const { deviceId } = req.params;

            const ratings = await Rating.findAll({ where: { deviceId } });

            if (ratings.length === 0) {
                return res.json({ averageRating: 0 }); 
            }

            const totalRatings = ratings.reduce((acc, rating) => acc + rating.name, 0);
            const averageRating = totalRatings / ratings.length;

            return res.json({ averageRating });
        } catch (error) {
            return next(ApiError.internal('Помилка під час отримання середнього рейтингу', error));
        }
    }

    async update(req, res, next) {
        try {
            const { deviceId, name, userId } = req.body; 

            const rating = await Rating.findOne({ where: { userId, deviceId } });
            if (!rating) {
                return next(ApiError.notFound('Рейтинг не знайдений'));
            }

            rating.name = name;
            await rating.save();

            return res.json(rating);
        } catch (error) {
            return next(ApiError.internal('Помилка під час оновлення рейтингу', error));
        }
    }

    async getUserRating(req, res, next) {
        try {
            
            const { deviceId, userId } = req.params; 

            const rating = await Rating.findOne({ where: { userId, deviceId } });
            if (!rating) {
                return next(ApiError.notFound('Рейтинг не знайдений'));
            }
            
            return res.json(rating.name);
        } catch (error) {
            return next(ApiError.internal('Помилка під час отримання рейтингу для "getUserRating"', error));
        }
    }
}

module.exports = new RatingController()