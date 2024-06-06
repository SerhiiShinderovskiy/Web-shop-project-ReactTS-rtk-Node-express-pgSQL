import React, { FC, useEffect } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { IDeviceProps } from "../Types/typesForDeviceItem";
import './styles/stylesForDeviceItem.css';
import star from '../assets/star.png';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { useAppDispatch, useAppSelector } from "../store/HooksForRedux/redux";
import { fetchAverageRating } from "../http/deviceAPI";
import { setRating } from "../store/DeviceSlice";

const DeviceItem: FC<IDeviceProps> = ({device}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const brands = useAppSelector((state) => state.deviceReducer.brands)
    const rating = useAppSelector((state) => state.deviceReducer.ratings[device.id]);
    
    const brand = brands.find((brand) => brand.id === device.brandId);

    useEffect(() => {
        const getRating = async () => {
            const averageRating = await fetchAverageRating(device.id);
            dispatch(setRating({ deviceId: device.id, rating: averageRating }));
        };
        getRating();
    }, [dispatch, device.id]);

    return(
        <Col md={3} className="mt-3" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className="forCard" border="light">
                {/* В полі 'img' зберігається назва файлу. Крім цієї назви потрібно також добавити url сервера */}
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{brand ? brand.name : 'Unknown Brand'}</div>
                    <div className="d-flex align-items-center"> 
                        <div>{rating !== undefined ? rating.toFixed(1) : 'Loading...'}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;