// Декодування токена і перевірка його на валідність. Якщо токен не валідний, то буде зразу повертатися помилка про те, що користувач не авторизований.
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
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
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизований"})
    }
}