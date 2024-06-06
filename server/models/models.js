// ОПИС МОДЕЛЕЙ ДАНИХ
const sequelize = require('../db')
// З пакету 'sequelize' знадобиться імпортувати клас "DataTypes" за допомогою якого описуються типи того чи іншого поля(string, integer...).
const {DataTypes} = require('sequelize')

// Опис першої моделі. Моделі користувача. Першим параметром вказується назва цієї моделі, в даному випадку 'user'.
const User = sequelize.define('user', {
    // Поля які будуть в цієї моделі.
    // Перше поле "id", тип цього поля "INTEGER"(тобто числовий), 
    // це буде первинний ключ і він буде автоінкрементуватися(тобто при створені кожного нового об'єкта 'id' буде 1, 2 і так далі).
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Наступне поле "email". Його тип вже буде рядковим, він має бути унікальним(два однакових 'email' бути не може).
    email: {type: DataTypes.STRING, unique: true},
    // Третє поле "password". Пароль може повторюватися в різних користувачів.
    password: {type: DataTypes.STRING},
    // Останнє поле "role". Також буде просто рядковим, і за замовчуванням будемо робити користувача просто 'USER'.
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.STRING, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

// Звязуюча таблиця/модель
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// Опис того як ці моделі пов'язані один з одним.
// Зв'язок між користувачем і кошиком один-до-одного. Тому викликається функція "hasOne" і передаємо туди модель кошика "basket".
User.hasOne(Basket)
// Для кошика "basket" викликаємо функцію "belongsTo". Таким чином повідомляємо що кошик належить користувачу.
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

// "info" це назва поля яке буде у масиву характеристик
Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

// Експорт всіх моделей щоб в подільшому в інших якихось файлах їх можна було використати.
module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}