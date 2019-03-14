import React from "react";
import styles from "./styles.scss";
import { useEnsureNavigationEffect } from "../hooks";

export default ({ match }) => {
    useEnsureNavigationEffect(match);

    return (
        <div className={styles.adminPageContainer}>
            This is the admin page for Arduino stuff.
        </div>
    );
};
