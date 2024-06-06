import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch } from './store/HooksForRedux/redux';
import {setIsAuth, setUser} from './store/UserSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    check().then(data => {
      dispatch(setIsAuth(true));
      dispatch(setUser(data));
    }).finally(() => setLoading(false));
  }, [])

  if (loading) {
    return <Spinner animation='grow'/>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;
