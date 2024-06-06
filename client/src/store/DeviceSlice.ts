import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IBrands, IDevices, ITypes } from "../Types/typesForDeviceStore"
import { IDeviceState } from "../Types/typesForReduxes";

const initialState: IDeviceState = {
    types: [],
    brands: [],
    devices: [],
    selectedType: {},
    ratings: {},
    selectedBrand: {},
    basketDevices: [],
    page: 1,
    totalCount: 0,
    limit: 3,
}

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        setTypes(state, action: PayloadAction<ITypes[]>) {
            state.types = action.payload;
        },
        setBrands(state, action: PayloadAction<IBrands[]>) {
            state.brands = action.payload;
        },
        setDevices(state, action: PayloadAction<IDevices[]>) {
            state.devices = action.payload;
        },
        setSelectedType(state, action: PayloadAction<ITypes | {}>) {
            state.selectedType = action.payload;
            state.page = 1;
        },
        setSelectedBrand(state, action: PayloadAction<IBrands | {}>) {
            state.selectedBrand = action.payload;
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = action.payload;
        },
        setLimit(state, action:PayloadAction<number>) {
            state.limit = action.payload;
        },
        setRating(state, action: PayloadAction<{ deviceId: string, rating: number }>) {
            state.ratings[action.payload.deviceId] = action.payload.rating;
        },
        setBasketDevices(state, action: PayloadAction<IDevices[]>) {
            state.basketDevices = action.payload;
        },
    },
});

export const {
    setTypes,
    setBrands,
    setDevices,
    setSelectedType,
    setSelectedBrand,
    setPage,
    setTotalCount,
    setLimit,
    setRating,
    setBasketDevices,
} = deviceSlice.actions;

export default deviceSlice.reducer;