const ApiError = require('../error/ApiError')

// Експорт функції. По суті функція в даному аипвдку і є middleware. Вона має приймати наступні параметри: помилка, запит, відповідь і функція "next".
// Викликавши яку("next") буде передано керування до наступного в ланцюзі middleware.
module.exports = function(err, req, res, next) {
    // В умові перевіримо, якщо клас помилки 'ApiError', тоді на клієнт повертаємо відповідь зі статус кодом, 
    // який буде отримано з помилки і повідомленням яке в цю помилку помістили.
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непередбачувана помилка"})
}