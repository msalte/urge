import React, { useState } from "react";
import styles from "./styles.scss";
import Button from "components/Button";
import Input from "components/Input";
import Spinner from "components/Spinner";
import Card from "components/Card";
import { post } from "global/fetch";
import serviceDiscovery from "global/serviceDiscovery";
import { setAuthTokens } from "global/localStorage";

const Body = ({ onUsernameChanged, onPasswordChanged }) => {
    return (
        <div>
            <Input
                icon="user"
                placeholder="Username..."
                onValueChanged={username => onUsernameChanged(username)}
            />
            <Input
                icon="key"
                placeholder="Password..."
                type="password"
                onValueChanged={password => onPasswordChanged(password)}
            />
        </div>
    );
};

const Footer = ({ onLoginClick, isPosting }) => {
    return (
        <div className={styles.footer}>
            <div className={styles.buttons}>
                <Button disabled>Register</Button>
                <Button
                    disabled={isPosting}
                    primary
                    onClick={() => onLoginClick()}
                >
                    Login
                </Button>
            </div>
            {isPosting && <Spinner text="Logging in..." />}
        </div>
    );
};

export default ({ onLogin }) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [isPosting, setPosting] = useState(false);
    const [error, setError] = useState(null);

    const handleLoginClick = () => {
        if (!username || !username.length || !password || !password.length) {
            return;
        }
        setPosting(true);
        post(serviceDiscovery.getUsersApi() + "/auth/login", {
            email: username,
            password,
        })
            .then(response => {
                const { token, refreshToken } = response;
                setAuthTokens(token, refreshToken);
                setPosting(false);
                onLogin(true);
            })
            .catch(error => {
                setPosting(false);
                setError(error);
                onLogin(false);
            });
    };

    return (
        <div className={styles.loginCardContainer}>
            <Card
                title="Log in"
                body={
                    <Body
                        onUsernameChanged={un => setUsername(un)}
                        onPasswordChanged={pw => setPassword(pw)}
                    />
                }
                footer={
                    <Footer
                        onLoginClick={() => handleLoginClick()}
                        isPosting={isPosting}
                    />
                }
            />
            {error && error.toString()}
        </div>
    );
};
