import React, { useContext } from "react";
import { Locations, ensureActiveLocation } from "../../../NavigationContext";
import Button from "../../Button";
import { UserContext } from "../../../UserContext";
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
