// Описання маршрутів до конкретних сторінок які є в додатку

import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Shop from "./pages/Shop"
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

type Route = {
    path: string;
    component: React.ReactNode;
}

// Ситсок маршрутів до сторінок до яких має доступ тільки авторизований користувач
export const authRoutes: Route[] = [
    {path: ADMIN_ROUTE, component: <Admin/>},
    {path: BASKET_ROUTE, component: <Basket/>}
]

// На ці маршрути може перейти абсолютно будь-який користувач
export const publicRoutes: Route[] = [
    {path: SHOP_ROUTE, component: <Shop/>},
    {path: LOGIN_ROUTE, component: <Auth/>},
    {path: REGISTRATION_ROUTE, component: <Auth/>},
    {path: DEVICE_ROUTE + '/:id', component: <DevicePage/>}
]