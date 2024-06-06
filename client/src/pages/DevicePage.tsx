import React, { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import './styles/stylesForDevPage.css';
import { useParams } from 'react-router-dom';
import { DevicePageParams, IDeviceState } from '../Types/typesForDevicePage';
import { fetchOneDevices, fetchAverageRating, addRating, fetchUserRating, fetchCreateBasketForUser } from '../http/deviceAPI';
import { useAppSelector } from '../store/HooksForRedux/redux';

const DevicePage: FC = () => {
    const [device, setDevice] = useState<IDeviceState>({info: []})
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null)
    const [newRating, setNewRating] = useState<any>(0)
    const {id} = useParams<DevicePageParams>();
    const user = useAppSelector((state) => state.userReducer.user)

    useEffect(() => {
        if (id) {
            fetchOneDevices(id).then(data => setDevice(data));
            fetchAverageRating(id).then(rating => setAverageRating(rating)); 

            // Перевірка, чи користувач має id
            if (user && user.user && user.user.id) {
                fetchUserRating(id, user.user.id)
                    .then(rating => {
                        console.log("User rating fetched:", rating);
                        setUserRating(rating);
                    })
                    .catch((error) => {
                        console.error("Error fetching user rating:", error);
                        setUserRating(null)
                    });
            } else {
                console.log("User or user ID is undefined");
            }
        }
    }, [id, user])

    const handleRatingSubmit = async () => {
        if (user && user.user && id) {
            try {
                await addRating(id, newRating, user.user.id);
                console.log("Add new rating", newRating);
                fetchAverageRating(id).then(rating => setAverageRating(rating));
                fetchUserRating(id, user.user.id).then(rating => setUserRating(rating));
            } catch (error) {
                console.error("Error submitting rating:", error);
            }
        }
    };

    const handleDeviceAdding = async () => {
        if (user && user.user && id) {
            try {
                await fetchCreateBasketForUser(user.user.id, device.id);
            } catch (error) {
                console.log("Error with Basket", error);
            }
        }
    }

    return (
        <Container className='mt-3'>
            <Row>
                {/* Колонка з зображенням */}
                {process.env.REACT_APP_API_URL && (
                    <Col md={4}>
                        <Image width={400} height={400} src={process.env.REACT_APP_API_URL + device.img}/>
                    </Col>
                )}
                {/* Колонка з рейтингом */}
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2 className='d-flex flex-column align-items-center'>
                            {device.name}
                        </h2>
                        <div
                            className='d-flex align-items-center justify-content-center forBigStar'
                        >
                            {averageRating !== null ? averageRating.toFixed(1) : 'Loading...'}
                        </div>
                        <div
                            className='d-flex align-items-center justify-content-center'
                        >
                            {userRating !== null ? `Your Rating: ${userRating}` : 'You have not rated this yet.'} {/* Відображаємо рейтинг користувача */}
                        </div>
                        {user && userRating === null && (
                            <Form>
                                <Form.Group controlId="rating">
                                    <Form.Control
                                        type="number" 
                                        placeholder='Set Your Rating'
                                        value={newRating} 
                                        onChange={(e) => setNewRating(e.target.value)}
                                        min={1} 
                                        max={5} 
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleRatingSubmit}>Submit Rating</Button>
                            </Form>
                        )}
                    </Row>
                </Col>
                {/* Колонка з "Добавити в кошик" */}
                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around forPriceCard'
                    >
                        <h3>{device.price} грн.</h3>
                        <Button 
                            variant='outline-dark'
                            onClick={handleDeviceAdding}
                        >
                            Добавити в кошик
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h1>Характеристики</h1>
                {device.info.map((info, index: number) =>
                    <Row key={info.id} className={`${index % 2 === 0 ? 'forDescription1' : 'forDescription2'}`}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;