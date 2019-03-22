import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";

export default ({ success, danger, warning, info, children }) => {
    return (
        <div
            className={classNames(styles.alertMessage, {
                [styles.success]: success,
                [styles.danger]: danger,
                [styles.warning]: warning,
                [styles.info]: info,
            })}
        >
            {children}
        </div>
    );
};
