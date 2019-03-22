import React, { useState } from "react";
import {
    getUserInfo,
    setUserInfo,
    clearUserInfo,
    getJwtToken,
    clearJwtToken,
} from "global/localStorage";

export const UserContext = React.createContext({
    currentUser: null,
    isAuthenticated: false,
    setAuthenticated: () => {},
    setCurrentUser: () => {},
    logout: () => {},
    fetchProfile: () => {},
    isLoggingOut: false,
    error: null,
});

export const UserContextStateProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(getJwtToken() !== null);
    const [isLoggingOut, setLoggingOut] = useState(false);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(getUserInfo());

    const handleFetchProfile = () => {
        const user = {
            id: "abc",
            name: "Morten Salte",
            email: "msalte86@outlook.com",
        };

        return new Promise(resolve =>
            setTimeout(() => {
                resolve(() => {});
            }, 500)
        ).then(() => {
            setCurrentUser(user);
            setUserInfo(user);
        });
    };

    const onLoggedOut = () => {
        setAuthenticated(false);
        clearUserInfo();
        clearJwtToken();
        setCurrentUser(null);
        setLoggingOut(false);
    };

    const handleLogout = () => {
        setLoggingOut(true);
        return new Promise(resolve =>
            setTimeout(() => {
                resolve(() => {});
            }, 500)
        ).then(() => {
            onLoggedOut();
            setError(null);
        });
    };

    return (
        <UserContext.Provider
            value={{
                currentUser,
                isAuthenticated,
                setAuthenticated: isAuthenticated => setAuthenticated(isAuthenticated),
                setCurrentUser: currentUser => setCurrentUser(currentUser),
                logout: () => handleLogout(),
                fetchProfile: () => handleFetchProfile(),
                isLoggingOut,
                error,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
