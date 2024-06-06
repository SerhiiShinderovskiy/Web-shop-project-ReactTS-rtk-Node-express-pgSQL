import { IBrands, IDevices, ITypes } from "./typesForDeviceStore";

export interface IUserState {
    isAuth: boolean;
    user: object | any;
}

export interface IBasket {
    id?: number;
    userId?: number;
}

export interface IDeviceState {
    types: ITypes[];
    brands: IBrands[];
    devices: IDevices[];
    selectedType: ITypes;
    basketDevices: IDevices[];
    ratings: { [deviceId: string]: number };
    selectedBrand: IBrands;
    page: number;
    totalCount: number;
    limit: number;
}