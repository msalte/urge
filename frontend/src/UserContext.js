import React, { useState } from "react";

export const UserContext = React.createContext({
    name: null,
    email: null,
    isLoggedIn: false,
    setName: () => {},
    setEmail: () => {},
    setLoggedIn: () => {},
});

export const UserContextStateProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <UserContext.Provider
            value={{
                name,
                email,
                isLoggedIn,
                setName: name => setName(name),
                setEmail: email => setEmail(email),
                setLoggedIn: isLoggedIn => setLoggedIn(isLoggedIn),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
