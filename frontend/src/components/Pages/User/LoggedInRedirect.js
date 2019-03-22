import React, { useContext } from "react";
import { UserContext } from "components/UserContext";
import { Redirect } from "react-router-dom";

export default () => {
    const userContext = useContext(UserContext);

    // validate jwt somehow
    userContext.setAuthenticated(true);

    return <Redirect to="/user" />;
};
