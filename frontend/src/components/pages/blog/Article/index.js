import React, { useContext } from "react";
import styles from "./styles.scss";
import ThemeContext, { themes } from "../../../../ThemeContext";
import classNames from "classnames";

export default ({ article }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <div
            className={classNames(styles.container, {
                [styles.dark]: themeContext.theme === themes.dark,
            })}
        >
            <div className={styles.title}>{article.title}</div>
            <div className={styles.content}>{article.content}</div>
        </div>
    );
};
