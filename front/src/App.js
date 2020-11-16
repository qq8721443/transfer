import React from 'react';
import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { CookiesProvider, withCookies, useCookies} from 'react-cookie';
import Register from './screens/RegisterScreen'
import Login from './screens/LoginScreen';
import Edit from './screens/EditScreen';
import DV from './screens/ViewScreen';
import Main from './screens/MainScreen';


function App() {
  return (
    <>
      <Route exact path="/" component={Main}/>
      <Route path="/login" component={Login}/>
      <Route exact path="/edit" component={Edit}/>
      <Route exact path="/edit/:id" component={Edit}/>
      <Route path="/detail/:id" component={DV}/>
      <Route path="/register" component={Register}/>
    </>
  );
}


function AppWrapper(){
  return(
    <CookiesProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </CookiesProvider>
  )
  
}

export default AppWrapper;
