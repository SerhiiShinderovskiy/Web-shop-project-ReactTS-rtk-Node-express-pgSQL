// Отримування типів, брендів, пристроїв... і їх створення.

import {$authHost, $host} from "./index";

// Запит на створення типу
export const createType = async (type: any) => {
    const {data} = await $authHost.post('api/type', type) // Тілом запиту цей "type" буде передаватися
    return data
}

// Запит на отримання типу
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

// Запит на створення бренду
export const createBrand = async (brand: any) => {
    const {data} = await $authHost.post('api/brand', brand) // Тілом запиту цей "brand" буде передаватися
    return data
}

// Запит на отримання бренду
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

// Запит на створення девайсу
export const createDevice = async (device: any) => {
    const {data} = await $authHost.post('api/device', device) // Тілом запиту цей "device" буде передаватися
    return data
}

// Запит на отримання девайсу
export const fetchDevices = async (typeId: any, brandId: any, page: any, limit = 8) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
    }})
    return data
}

// Запит на отримання одного девайсу
export const fetchOneDevices = async (id: number) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

// Запит на отримання середнього рейтингу
export const fetchAverageRating = async (deviceId: string) => {
    const {data} = await $host.get(`api/rating/${deviceId}`)
    return data.averageRating;
};

// Запит на створення рейтингу
export const addRating = async (deviceId: string, rating: number, userId: string) => {
    const {data} = await $authHost.post('api/rating/', {deviceId, name: rating, userId})
    console.log("Fetch user rating request data:", data);
    return data
}

// Запит на оновлення рейтингу
export const updateRating = async (deviceId: string, rating: number, userId: string) => {
    const {data} = await $authHost.put('api/rating/', {deviceId, rating, userId})
    return data
}

// Додаємо функцію для отримання рейтингу користувача для певного пристрою
export const fetchUserRating = async (deviceId: string, userId: string) => {
    // console.log(`Fetching user rating for device ${deviceId} and user ${userId}`); // Додано для перевірки перед запитом
    const { data } = await $authHost.get(`/api/rating/user/${deviceId}/${userId}`);
    console.log("Fetch user rating response data:", data); // Додано для перевірки даних відповіді
    return data
};

export const fetchCreateBasketForUser = async (userId: number, deviceId: any) => {
    console.log("userId: ", userId, "deviceId: ", deviceId);
    const {data} = await $authHost.post('/api/basket', {userId, deviceId});
    console.log("Fetch create basket for user", data);
    return data
}

export const fetchBasketForUser = async (userId: any) => {
    const {data} = await $authHost.get(`/api/basketdevices/${userId}`);
    console.log("Fetch Basket", data);
    return data
}

export const fetchDeleteDeviceFromBasket = async (userId: number, deviceId: number) => {
    console.log("userId:", userId, "deviceId:", deviceId);
    const {data} = await $authHost.delete('/api/basketdevices/', {
        data: {userId, deviceId}
    })
    console.log("Fetch delete device from basket", data);
    return data
}