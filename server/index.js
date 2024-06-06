require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

// Отримання порта з змінної оточення.
const PORT = process.env.PORT || 5000 // Але якщо змінна не задана то за замовчуванням ставиться "5000".
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)
// Оброблення помилок, останній Middleware
app.use(errorHandler)

// Виклик функції для підключення до БД
const start = async () => {
    try {
        // За допомогою функції "authenticate" буде встановлюватися підключення до БД
        await sequelize.authenticate()
        // Функція "sync" буде звіряти стан БД зі схемою даних.
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()