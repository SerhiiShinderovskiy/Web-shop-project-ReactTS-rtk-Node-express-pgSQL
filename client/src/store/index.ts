import {combineReducers, configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import DeviceSlice from "./DeviceSlice";

// Кореневий редюсер
const rootReducer = combineReducers({
    userReducer: UserSlice,
    deviceReducer: DeviceSlice
})

// Конфігурація store
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

// Типи для взаємодії зі сховищем
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
// За допомогою "AppDispatch" типізується useDispatch хук
export type AppDispatch = AppStore['dispatch']