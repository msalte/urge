import React, { useContext } from "react";
import { Locations, ensureActiveLocation } from "components/NavigationContext";
import Button from "components/Button";
import { UserContext } from "components/UserContext";
import LoginCard from "./LoginCard";

export default () => {
    ensureActiveLocation(Locations.user);

    const userContext = useContext(UserContext);

    if (userContext.isLoggedIn) {
        return (
            <div>
                You are logged in as {userContext.user.name}.
                <Button onClick={() => userContext.setLoggedIn(false)}>
                    Sign out
                </Button>
            </div>
        );
    } else {
        return (
            <LoginCard
                onLogin={isLoggedIn => {
                    userContext.setLoggedIn(isLoggedIn);
                }}
            />
        );
    }
};
