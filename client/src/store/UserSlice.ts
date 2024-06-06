import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../Types/typesForReduxes";

const initialState: IUserState = {
    isAuth: false,
    user: {},
}

// Створення редюсера
const userSlice = createSlice({
    name: "user",
    initialState,
    // Екшени
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        // Екшен для збереження даних користувача після авторизації
        setUser(state, action: PayloadAction<object>) {
            state.user = action.payload;
        },
    },
});

export const {setIsAuth, setUser} = userSlice.actions;
export default userSlice.reducer;