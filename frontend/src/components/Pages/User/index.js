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

const resolveLoginUrl = () => {
    const redirectUrl = serviceDiscovery.getSpaApi() + "/auth/signin-implicit";
    const clientId = "8401e1ec-cd57-4f31-b650-6d4d67a79aa5";
    const policy = "B2C_1_signupsignin";

    return `https://urgeaad.b2clogin.com/urgeaad.onmicrosoft.com/oauth2/v2.0/authorize?p=${policy}&client_id=${clientId}&nonce=defaultNonce&redirect_uri=${redirectUrl}&scope=openid&response_type=id_token&prompt=login`;
};

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
        window.location = resolveLoginUrl();
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
