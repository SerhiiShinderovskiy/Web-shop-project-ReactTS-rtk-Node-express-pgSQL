import React, { FC, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';
import { useAppDispatch, useAppSelector } from '../store/HooksForRedux/redux';
import { setTypes, setBrands, setDevices, setTotalCount } from '../store/DeviceSlice';

const Shop: FC = () => {
    const dispatch = useAppDispatch()
    const selectedType = useAppSelector((state) => state.deviceReducer.selectedType)
    const selectedBrand = useAppSelector((state) => state.deviceReducer.selectedBrand)
    const page = useAppSelector((state) => state.deviceReducer.page)

    useEffect(() => {
        fetchTypes().then(data => dispatch(setTypes(data)))
        fetchBrands().then(data => dispatch(setBrands(data)))
        fetchDevices(null, null, 1, 4).then(data => {
            dispatch(setDevices(data.rows))
            dispatch(setTotalCount(data.count))
        })
    }, [])

    useEffect(() => {
        fetchDevices(selectedType.id, selectedBrand.id, page, 4).then(data => {
            dispatch(setDevices(data.rows))
            dispatch(setTotalCount(data.count))
        })
    }, [page, selectedType, selectedBrand])

    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;