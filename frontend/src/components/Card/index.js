import React, { useContext } from "react";
import classNames from "classnames";
import styles from "./styles.scss";
import ThemeContext, { themes } from "../../ThemeContext";

export default ({ banner, title, body, footer, enableHover }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <div
            className={classNames(styles.cardContainer, {
                [styles.enableHover]: enableHover,
                [styles.darkTheme]: themeContext.theme === themes.dark,
            })}
        >
            {banner && <div className={styles.banner}>{banner}</div>}
            {title && <div className={styles.title}>{title}</div>}
            {body && <div className={styles.body}>{body}</div>}
            {footer && <div className={styles.footer}>{footer}</div>}
        </div>
    );
};
