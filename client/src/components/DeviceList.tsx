import React, { FC } from "react";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { useAppSelector } from "../store/HooksForRedux/redux";

const DeviceList: FC = () => {
    const devices = useAppSelector((state) => state.deviceReducer.devices)

    return(
        <Row>
            {devices.map((device: any) =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </Row>
    );
};

export default DeviceList;