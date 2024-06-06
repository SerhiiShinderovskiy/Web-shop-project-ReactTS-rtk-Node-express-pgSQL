interface IInfoDevice {
    id: number;
    title: string;
    description: string;
}

export interface IDeviceState {
    id?: number;
    name?: string;
    price?: number;
    rating?: number;
    img?: string;
    info: IInfoDevice[];
}

export type DevicePageParams = {
    id?: any;
}