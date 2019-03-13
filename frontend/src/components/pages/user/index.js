import React, { useContext, useEffect } from "react";
import NavigationContext from "components/NavigationContext";
import Button from "components/Button";
import { UserContext } from "components/UserContext";
import LoginCard from "components/LoginCard";
import Spinner from "components/Spinner";
import Card from "components/Card";
import styles from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
    const userContext = useContext(UserContext);
    const navContext = useContext(NavigationContext);

    useEffect(() => {
        navContext.setActiveLocation(navContext.locations.user);
        userContext.fetchProfile();
    }, []);

    const { isLoggedIn, currentUser, logout, isLoggingOut } = userContext;

    if (!isLoggedIn) {
        return <LoginCard />;
    }

    const cardBody = (
        <div className={styles.profileContainer}>
            <div className={styles.table}>
                <div className={styles.labelCell}>
                    <FontAwesomeIcon className={styles.icon} icon="id-card" />
                    Id
                </div>
                <div className={styles.contentCell}>{currentUser.id}</div>
                <div className={styles.labelCell}>
                    <FontAwesomeIcon className={styles.icon} icon="tag" />
                    Name
                </div>
                <div className={styles.contentCell}>{currentUser.name}</div>
                <div className={styles.labelCell}>
                    <FontAwesomeIcon className={styles.icon} icon="envelope" />
                    Email
                </div>
                <div className={styles.contentCell}>{currentUser.email}</div>
            </div>
        </div>
    );

    const cardFooter = (
        <div className={styles.logoutContainer}>
            <Button primary disabled={isLoggingOut} onClick={() => logout()}>
                Sign out
            </Button>
            {isLoggingOut && <Spinner text="Logging out..." />}
        </div>
    );

    return (
        <div className={styles.userPageContainer}>
            <Card title="Profile" body={cardBody} footer={cardFooter} />
        </div>
    );
};
