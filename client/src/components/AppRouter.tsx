import React, { FC } from 'react';
import {Routes, Route} from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import Shop from '../pages/Shop';
import { useAppSelector } from '../store/HooksForRedux/redux';

// Навігація по сторінках
const AppRouter: FC = () => {
    const isAuth = useAppSelector((state) => state.userReducer.isAuth)
    
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component}/>
            )}
            {publicRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component}/>
            )}
            <Route path='*' element={<Shop/>}/>
        </Routes>
    );
};

export default AppRouter;