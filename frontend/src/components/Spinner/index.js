import React from "react";
import styles from "./styles.scss";

export default ({ text }) => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
            {text && <div className={styles.text}>{text}</div>}
        </div>
    );
};
