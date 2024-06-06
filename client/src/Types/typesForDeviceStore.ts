export interface ICommonDevStr {
    id?: number | any;
    name?: string;
}

export interface ITypes extends ICommonDevStr {}

export interface IBrands extends ICommonDevStr {}

export interface IDevices extends ICommonDevStr {
    price: number;
    rating: number;
    img: string;
    brandId?: number;
    deviceId?: number;
}