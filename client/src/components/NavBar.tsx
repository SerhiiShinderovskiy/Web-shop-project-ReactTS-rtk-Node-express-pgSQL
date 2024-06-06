import React, { FC } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import './styles/stylesForNavBar.css'
import { useAppDispatch, useAppSelector } from "../store/HooksForRedux/redux";
import { setUser, setIsAuth } from "../store/UserSlice";

const NavBar: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector((state) => state.userReducer.isAuth)
    const user = useAppSelector((state) => state.userReducer.user)
    const navigate = useNavigate()

    const logOut = () => {
        dispatch(setUser({}))
        dispatch(setIsAuth(false))
    }

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <NavLink className="linkHome" to={SHOP_ROUTE}>BuyDevice</NavLink>
                    {isAuth ?
                        <Nav className="ml-auto">
                            <Button 
                                variant="outline-light" 
                                className="me-2"
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Адмін панель
                            </Button>
                            <Button
                                variant="outline-light"
                                className="me-2"
                                onClick={() => navigate(BASKET_ROUTE)}
                            >
                                Кошик
                            </Button>
                            <Button 
                                variant="outline-light"
                                onClick={() => logOut()}
                                className="ml-2"
                            >
                                Вийти
                            </Button>
                            <div className="forEmail">{user.user.email}</div>
                        </Nav>
                        :
                        <Nav className="ml-auto">
                            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Авторизація</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;