import React from "react";
import styles from "./styles.scss";
import FontAwesome from "react-fontawesome";
import classNames from "classnames";
import ThemeContext from "../../ThemeContext";

export default props => {
    const { icon, isCollapsed } = props;

    const themeContext = React.useContext(ThemeContext);

    const iconClassName = classNames(styles.icon, {
        [styles.dark]: themeContext.theme === "dark",
        [styles.collapsed]: isCollapsed,
    });

    return (
        <div className={styles.menuItem}>
            <div className={iconClassName}>
                <FontAwesome name={icon} />
            </div>
            {props.children}
        </div>
    );
};
