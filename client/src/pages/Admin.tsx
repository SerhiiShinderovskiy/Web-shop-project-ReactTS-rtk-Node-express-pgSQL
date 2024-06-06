import React, { FC, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import { IAdminState } from '../Types/typesForAdminCr';

const Admin: FC<IAdminState> = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisivle, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className='d-flex flex-column'>
            <Button 
                variant='outline-dark' 
                className='mt-4 pt-2'
                onClick={() => setTypeVisible(true)}
            >
                Добавити тип
            </Button>
            <Button 
                variant='outline-dark' 
                className='mt-4 pt-2'
                onClick={() => setBrandVisible(true)}
            >
                Добавити бренд
            </Button>
            <Button 
                variant='outline-dark' 
                className='mt-4 pt-2'
                onClick={() => setDeviceVisible(true)}
            >
                Добавити девайс
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisivle} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
};

export default Admin;