import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/HooksForRedux/redux';
import { Button, Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import star from '../assets/star.png';
import { IDeviceProps } from '../Types/typesForDeviceItem';
import { fetchAverageRating, fetchBasketForUser, fetchDeleteDeviceFromBasket } from '../http/deviceAPI';
import { setBasketDevices, setRating } from '../store/DeviceSlice';

const BasketDevicesItem: FC<IDeviceProps> = ({device}) => {
    const dispatch = useAppDispatch()
    const brands = useAppSelector((state) => state.deviceReducer.brands)
    const rating = useAppSelector((state) => state.deviceReducer.ratings[device.id]);
    const user = useAppSelector((state) => state.userReducer.user)
    const navigate = useNavigate()

    const brand = brands.find((brand) => brand.id === device.brandId);

    useEffect(() => {
        const getRating = async () => {
            const averageRating = await fetchAverageRating(device.id);
            dispatch(setRating({ deviceId: device.id, rating: averageRating }));
        };
        getRating();
    }, [dispatch, device.id]);

    const handleDelete = async () => {
        if (user && user.user && user.user.id) {
            try {
                await fetchDeleteDeviceFromBasket(user.user.id, device.id);
                const updatedBasketDevices = await fetchBasketForUser(user.user.id);
                dispatch(setBasketDevices(updatedBasketDevices));
            } catch (error) {
                console.error("Error deleting device from basket:", error);
            }
        } else {
            console.log("Problems in basket: user is not defined or not authenticated");
        }
    };

    return (
        <Col key={device.id} md={3} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className="forCard" border="light">
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{brand ? brand.name : 'Unknown Brand'}</div>
                    <div className="d-flex align-items-center"> 
                        <div>{rating !== undefined ? rating.toFixed(1) : 'Loading...'}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
                <Button variant='outline-dark' onClick={handleDelete}>Видалити товар</Button>
            </Card>
        </Col>
    );
};

export default BasketDevicesItem;