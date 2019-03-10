import React, { useState, useContext } from "react";
import styles from "./styles.scss";
import { Locations, ensureActiveLocation } from "../../../NavigationContext";
import Button from "../../Button";
import Input from "../../Input";
import { UserContext } from "../../../UserContext";
import { post } from "../../../global/fetch";
import serviceDiscovery from "../../../global/serviceDiscovery";
import { setAuthTokens } from "../../../global/localStorage";
import Spinner from "../../Spinner";

const LoginForm = ({ onLoginClicked }) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <div className={styles.loginFormContainer}>
            <Input
                icon="user"
                placeholder="Username..."
                onValueChanged={username => setUsername(username)}
            />
            <Input
                icon="key"
                placeholder="Password..."
                type="password"
                onValueChanged={password => setPassword(password)}
            />
            <div className={styles.buttons}>
                <Button disabled>Register</Button>
                <Button
                    primary
                    onClick={() =>
                        onLoginClicked && onLoginClicked(username, password)
                    }
                >
                    Login
                </Button>
            </div>
        </div>
    );
};

export default () => {
    ensureActiveLocation(Locations.user);

    const userContext = useContext(UserContext);

    const [isPosting, setPosting] = useState(false);
    const [error, setError] = useState(null);

    const handleLoginClick = (username, password) => {
        setPosting(true);
        post(serviceDiscovery.getUsersApi() + "/auth/login", {
            email: username,
            password,
        })
            .then(response => {
                const { token, refreshToken } = response;
                setAuthTokens(token, refreshToken);
                setPosting(false);
                userContext.setLoggedIn(true);
            })
            .catch(error => {
                setPosting(false);
                setError(error);
                userContext.setLoggedIn(false);
            });
    };

    if (userContext.isLoggedIn) {
        return (
            <div>
                You are logged in.
                <Button onClick={() => userContext.setLoggedIn(false)}>
                    Sign out
                </Button>
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <LoginForm
                    onLoginClicked={(username, password) =>
                        handleLoginClick(username, password)
                    }
                />
                {isPosting && <Spinner text="Logging in..." />}
                {error && error.toString()}
            </React.Fragment>
        );
    }
};
