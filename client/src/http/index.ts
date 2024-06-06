import axios from "axios";

// Інстанс. Для звичайних запитів, які не потребують авторизації
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// Другий інстанс. До кожного запиту автоматично буде підставлятися "headers.authorization", і туди буде добавлятися 'token' кожному запиту.
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}