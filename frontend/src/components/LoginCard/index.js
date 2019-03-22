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
