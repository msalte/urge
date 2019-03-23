import React, { useContext, useEffect } from "react";
import NavigationContext from "components/NavigationContext";
import Button from "components/Button";
import { UserContext } from "components/UserContext";
import serviceDiscovery from "global/serviceDiscovery";
import Spinner from "components/Spinner";
import Card from "components/Card";
import styles from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export { default as UserLoggedInRedirect } from "./LoggedInRedirect";

export default () => {
    const userContext = useContext(UserContext);
    const navContext = useContext(NavigationContext);

    useEffect(() => {
        navContext.setActiveLocation(navContext.locations.user);

        if (userContext.isAuthenticated) {
            userContext.fetchProfile();
        }
    }, []);

    const { isAuthenticated, currentUser, logout, isLoggingOut } = userContext;

    if (!isAuthenticated) {
        window.location = serviceDiscovery.getSpaApi() + "/auth/login";
        return <Spinner floating text="Redirecting to login page..." />;
    } else if (currentUser === null) {
        return <Spinner floating text="Fetching user profile..." />;
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
