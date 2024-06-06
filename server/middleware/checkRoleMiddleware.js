// Можливості адміністратора
const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        // Перевірка якщо метод рівний(===) "OPTIONS", то пропускаємо
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            // #Logic
            // По-перше з хедера(Header) вичипети сам токен. В хедер спершу поміщається тип токена, а тоді сам токен.
            const token = req.headers.authorization.split(' ')[1] // Bearer(тип токена) fbndlbnrklnvskv(сам токен)
            if (!token) {
                return res.status(401).json({message: "Не авторизований"})
            }
            // Якщо токен є, то його потрібно розкодувати.
            // Функція "verify" буде перевіряти токен на валідність. Першим параметром потрібно передати сам токен, а другим секретний ключ.
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Немає доступа"})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизований"})
        }
    };
}
    
    
    