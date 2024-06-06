import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/HooksForRedux/redux';
import { fetchBasketForUser } from '../http/deviceAPI';
import { Row } from 'react-bootstrap';
import BasketDevicesItem from '../components/BasketDevicesItem';
import { setBasketDevices } from '../store/DeviceSlice';
import { IDevices } from '../Types/typesForDeviceStore';


const Basket: FC = () => {
    const dispatch = useAppDispatch()
    const devices = useAppSelector((state) => state.deviceReducer.devices)
    const basketDevices = useAppSelector((state) => state.deviceReducer.basketDevices)
    const user = useAppSelector((state) => state.userReducer.user)

    useEffect(() => {
        if (user && user.user && user.user.id) {
            console.log('Fetching basket for user:', user.user.id);
            fetchBasketForUser(user.user.id)
                .then((data) => {
                    console.log('Fetched basket data:', data);
                    const deviceIds = data.map((item: { deviceId: number }) => item.deviceId);
                    const basketDevicesDetails = deviceIds.map((deviceId: number) => devices.find(device => device.id === deviceId));
                    console.log('Basket devices details:', basketDevicesDetails);
                    dispatch(setBasketDevices(basketDevicesDetails.filter(Boolean) as IDevices[]));
                })
                .catch((error) => {
                    console.error("Error fetching basket:", error);
                });
        } else {
            console.log("Problems in basket: user is not defined or not authenticated");
        }
    }, [user, devices, dispatch])

    return (
        <div>
            <Row className='mt-2'>
                {basketDevices.length > 0 ? (
                    basketDevices.map((device: IDevices) => (
                        <BasketDevicesItem key={device.id} device={device}/>
                    ))
                ) : (
                    <div>Кошик порожній</div>
                )}
            </Row>
        </div>
    );
};

export default Basket;