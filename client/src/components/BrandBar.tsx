import React, { FC } from "react";
import { Card, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/HooksForRedux/redux";
import { setSelectedBrand } from "../store/DeviceSlice";
import './styles/stylesForBrandBar.css';

// Панель з брендами
const BrandBar: FC = () => {
    const dispatch = useAppDispatch(); 
    const brands = useAppSelector((state) => state.deviceReducer.brands); 
    const selectedBrand = useAppSelector((state) => state.deviceReducer.selectedBrand);

    return(
        <Row>
            {brands.map((brand) =>
                <Card
                    key={brand.id}
                    className="p-3 listRam"
                    onClick={() => dispatch(setSelectedBrand(brand))}
                    border={brand.id === selectedBrand.id ? 'danger' : 'light'} 
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
};

export default BrandBar;