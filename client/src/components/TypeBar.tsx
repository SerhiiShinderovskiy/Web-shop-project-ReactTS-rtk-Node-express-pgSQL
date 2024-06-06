// Ліва панель з типами
import React, { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/HooksForRedux/redux";
import { setSelectedType } from "../store/DeviceSlice";
import './styles/stylesForTypeBar.css';

const TypeBar: FC = () => {
    const dispatch = useAppDispatch();
    const types = useAppSelector((state) => state.deviceReducer.types);
    const selectedType = useAppSelector((state) => state.deviceReducer.selectedType)

    return (
        <ListGroup>
            {types.map((type: any) =>
                <ListGroup.Item
                    className="listGr"
                    active={type.id === selectedType.id}
                    onClick={() => dispatch(setSelectedType(type))}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default TypeBar;