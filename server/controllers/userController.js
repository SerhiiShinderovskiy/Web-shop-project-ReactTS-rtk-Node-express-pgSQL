const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некоректний "email" або "password"'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Користувач з таким "email" вже існує'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({user: user.id})
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Користувач не знайдений'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Невірно вказаний пароль'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async chek(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async remove(req, res, next) {
        try {
            const {id} = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiError.notFound('Користувач не знайдений'));
            }
            await user.destroy();
            return res.json({message: 'Користувач успішно видалений'});
        } catch (error) {
            return next(ApiError.internal('Помилка під час видалення користувача', error));
        }
    }
}
module.exports = new UserController()