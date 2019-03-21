import React, { useState, useContext } from "react";
import styles from "./styles.scss";
import Button from "components/Button";
import Input from "components/Input";
import Spinner from "components/Spinner";
import Card from "components/Card";
import { UserContext } from "components/UserContext";

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

const Footer = ({ onLoginClick, isLoggingIn }) => {
    return (
        <div className={styles.footer}>
            <div className={styles.buttons}>
                <Button disabled>Register</Button>
                <Button submit disabled={isLoggingIn} primary onClick={() => onLoginClick()}>
                    Login
                </Button>
                <a
                    href="https://urgeaad.b2clogin.com/urgeaad.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupsignin&client_id=8401e1ec-cd57-4f31-b650-6d4d67a79aa5&nonce=defaultNonce&redirect_uri=https%3A%2F%2Flocalhost%3A44300%2Fauth%2Fsignin-implicit&scope=openid&response_type=id_token&prompt=login"
                    target="_blank"
                >
                    <Button primary>Azure AD B2C</Button>
                </a>
            </div>
            {isLoggingIn && <Spinner text="Logging in..." />}
        </div>
    );
};

export default () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const userContext = useContext(UserContext);

    const { login, isLoggingIn, error } = userContext;

    const handleSubmit = event => {
        if (event) {
            event.preventDefault();
        }

        if (username && username.length && password && password.length) {
            login(username, password);
        }
    };

    return (
        <div className={styles.loginCardContainer}>
            <form onSubmit={e => handleSubmit(e)}>
                <Card
                    title="Log in"
                    body={
                        <Body
                            onUsernameChanged={un => setUsername(un)}
                            onPasswordChanged={pw => setPassword(pw)}
                        />
                    }
                    footer={
                        <Footer isLoggingIn={isLoggingIn} onLoginClick={e => handleSubmit(e)} />
                    }
                />
                {error && error.toString()}
            </form>
        </div>
    );
};
