import React, { useState } from "react";
import {
    getJwtToken,
    getRefreshToken,
    clearAuthTokens,
    getUserProfile,
    setUserProfile,
    clearUserProfile,
} from "./global/localStorage";
import serviceDiscovery from "./global/serviceDiscovery";
import { fetch, post } from "./global/fetch";

export const UserContext = React.createContext({
    profile: null,
    isLoggedIn: false,
    setLoggedIn: () => {},
});

const hasToken = () => {
    const jwt = getJwtToken();
    return jwt && jwt.length;
};

export const UserContextStateProvider = ({ children }) => {
    const profile = getUserProfile();
    const [user, setUser] = useState(profile);

    const handleLoggedIn = loggedIn => {
        if (loggedIn) {
            // Presumably the user logged in. If we have a token in local storage, accept.
            const accepted = hasToken();

            if (accepted) {
                fetch(serviceDiscovery.getUsersApi() + "/users/me", true)
                    .then(profile => {
                        setUserProfile(profile);
                        setUser(profile);
                    })
                    .catch(error => console.error(error));
            }
        } else {
            post(
                serviceDiscovery.getUsersApi() + "/auth/logout",
                { refreshToken: getRefreshToken() },
                true
            ).then(() => {
                setUser(null);
                clearUserProfile();
                clearAuthTokens();
            });
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn: user && user.id,
                setLoggedIn: isLoggedIn => handleLoggedIn(isLoggedIn),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
