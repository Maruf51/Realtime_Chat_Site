import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './responsive.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from './redux/store';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const ActiveUsers = createContext()
export const AllMessages = createContext()
export const RefreshLastMessage = createContext()
export const NavBtnToggler = createContext()
export const LoginData = createContext()
function App() {
  const [activeUsers, setActiveUsers] = useState([])
  const [allMessages, setAllMessages] = useState([])
  const [refreshLastMessage, setRefreshLastMessage] = useState(true)
  const [navbarToggle, setNavbarToggle] = useState(false)
  const [loginData, setLoginData] = useState({})
  console.log(refreshLastMessage)
  return (
    <LoginData.Provider value={[loginData, setLoginData]}>
      <ActiveUsers.Provider value={[activeUsers, setActiveUsers]}>
        <RefreshLastMessage.Provider value={[refreshLastMessage, setRefreshLastMessage]}>
          <AllMessages.Provider value={[allMessages, setAllMessages]}>
            <NavBtnToggler.Provider value={[navbarToggle, setNavbarToggle]}>
              <Provider store={store}>
                <Router>
                  <Switch>
                    <PrivateRoute exact path="/">
                      <Dashboard />
                    </PrivateRoute>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route path="/register">
                      <Register />
                    </Route>
                  </Switch>
                </Router>
              </Provider>
            </NavBtnToggler.Provider>
          </AllMessages.Provider>
        </RefreshLastMessage.Provider>
      </ActiveUsers.Provider>
    </LoginData.Provider>
  );
}

export default App;
