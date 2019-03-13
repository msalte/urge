import React, { useState } from "react";
import {
    getRefreshToken,
    clearAuthTokens,
    getUserInfo,
    setUserInfo,
    clearUserInfo,
    setAuthTokens,
} from "global/localStorage";
import serviceDiscovery from "global/serviceDiscovery";
import { fetch, post } from "global/fetch";

export const UserContext = React.createContext({
    currentUser: null,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    fetchProfile: () => {},
    isLoggingIn: false,
    isLoggingOut: false,
    error: null,
});

export const UserContextStateProvider = ({ children }) => {
    const storedUserInfo = getUserInfo();

    const [isLoggingIn, setLoggingIn] = useState(false);
    const [isLoggingOut, setLoggingOut] = useState(false);
    const [error, setError] = useState(null);

    const [currentUser, setCurrentUser] = useState(storedUserInfo);

    const handleFetchProfile = () => {
        fetch(serviceDiscovery.getUsersApi() + "/users/me", true).then(
            profile => {
                setUserInfo(profile);
                setCurrentUser(profile);
            }
        );
    };

    const handleLogin = (username, password) => {
        setLoggingIn(true);
        post(serviceDiscovery.getUsersApi() + "/auth/login", {
            email: username,
            password,
        })
            .then(response => {
                const { token, refreshToken } = response;
                setAuthTokens(token, refreshToken);
                setLoggingIn(false);

                // now that the user is logged in, fetch user info
                handleFetchProfile();
            })
            .catch(error => {
                setLoggingIn(false);
                setError(error);
            });
    };

    const handleLogout = () => {
        setLoggingOut(true);
        post(
            serviceDiscovery.getUsersApi() + "/auth/logout",
            { refreshToken: getRefreshToken() },
            true
        )
            .then(() => {
                clearUserInfo();
                setCurrentUser(null);
                clearAuthTokens();
                setLoggingOut(false);
            })
            .catch(error => {
                setLoggingOut(false);
                setError(error);
            });
    };

    return (
        <UserContext.Provider
            value={{
                currentUser: currentUser,
                isLoggedIn: currentUser && currentUser.email,
                login: (username, password) => handleLogin(username, password),
                logout: () => handleLogout(),
                fetchProfile: () => handleFetchProfile(),
                isLoggingIn,
                isLoggingOut,
                error,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
