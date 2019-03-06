import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";

export default ({ text, floating }) => {
    return (
        <div
            className={classNames(styles.spinnerContainer, {
                [styles.floating]: floating,
            })}
        >
            <div className={styles.spinner} />
            {text && <div className={styles.text}>{text}</div>}
        </div>
    );
};
