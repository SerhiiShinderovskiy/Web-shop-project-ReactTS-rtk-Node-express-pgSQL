import React, { FC, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import './styles/styleForAuth.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { useAppDispatch, useAppSelector } from '../store/HooksForRedux/redux';
import { setUser, setIsAuth } from '../store/UserSlice';

const Auth: FC = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.userReducer.user)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // Універсальна функція під реєстрацію та авторизацію
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login({email, password});
            } else {
                data = await registration({email, password});            
            }
            // Після того як запит пройшов в "userStore" зберігається дані про користувача і "setIsAuth(true)"
            dispatch(setUser(user))
            dispatch(setIsAuth(true))
            // Коли користувач залогінився(функція виконалася успішно), то його перекидає на сторінку магазину  
            navigate(SHOP_ROUTE)
        } catch (error: any) {
            alert(error.response.data.message)
        }
        
    }

    return (
        <Container className='d-flex justify-content-center align-items-center contein'>
            <Card className='card p-5'>
                <h2 className='m-auto'>{isLogin ? "Авторизація" : "Реєстрація"}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введіть ваш email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введіть ваш пароль...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                        {isLogin ?
                            <div>
                                Немає акаунта? <NavLink to={REGISTRATION_ROUTE}>Зареєструйся!</NavLink>
                            </div>
                            :
                            <div>
                                Є акаунт? <NavLink to={LOGIN_ROUTE}>Ввійдіть!</NavLink>
                            </div>
                        }
                        <Button
                            variant='outline-success'
                            onClick={click}
                        >
                            {isLogin ? "Ввійти" : "Реєстрація"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;