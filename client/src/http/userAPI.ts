// Реалізація функції реєстрації, авторизації і перевірки токена на валідність

import { IRegProps } from "../Types/typesForHTTP";
import {$authHost, $host} from "./index";
import { JwtPayload, jwtDecode } from 'jwt-decode';

export const registration = async({email, password}: IRegProps) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    const decodedToken = jwtDecode<JwtPayload>(data.token)
    // В 'localStorage' по ключу 'token' поміщаємо токен з тіла запиту
    localStorage.setItem('token', data.token)
    return decodedToken
}

export const login = async({email, password}: IRegProps) => {
    const {data} = await $host.post('api/user/login', {email, password})
    const decodedToken = jwtDecode<JwtPayload>(data.token)
    localStorage.setItem('token', data.token)
    return decodedToken
}

// Логіка така: Користувач авторизувався, токен зберігся, і тоді кожен раз при оновлені сторінки буде викликатися функція "check", 
// і якщо токен не валідний то користувач буде розлогінюватися, якщо валідний, то користувач попадатиме на сторінку магазину під своїм акаунтом.
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    const decodedToken = jwtDecode<JwtPayload>(data.token)
    localStorage.setItem('token', data.token)
    return {user: decodedToken, token: data.token}
}