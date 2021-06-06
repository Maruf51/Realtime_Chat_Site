import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import useLocalStorage from '../LocalStorage/LocalStorage';

const PrivateRoute = ({children, ...rest}) => {
    const [chatAppLoginData, setChatAppLoginData] = useLocalStorage('chatAppLoginData', [])

    return (
        <Route
            {...rest}
            render={({ location }) =>
                chatAppLoginData.email ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRoute;