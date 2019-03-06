import React from "react";
import classNames from "classnames";
import styles from "./styles.scss";

export default ({ banner, title, body, footer, enableHover }) => {
    return (
        <div
            className={classNames(styles.cardContainer, {
                [styles.enableHover]: enableHover,
            })}
        >
            {banner && <div className={styles.banner}>{banner}</div>}
            {title && <div className={styles.title}>{title}</div>}
            {body && <div className={styles.body}>{body}</div>}
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
};
