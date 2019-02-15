import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "./MenuItem";
import ThemeContext from "../../ThemeContext";

export default () => {
    const [isCollapsed, setCollapsed] = React.useState(false);
    const themeContext = React.useContext(ThemeContext);

    const sideBar = classNames(styles.sideBar, {
        [styles.collapsed]: isCollapsed === true,
        [styles.dark]: themeContext.theme === "dark",
    });

    const collapseButton = classNames(styles.collapseButton, {
        [styles.collapsed]: isCollapsed === true,
    });

    return (
        <div className={sideBar}>
            <MenuItem isCollapsed={isCollapsed} icon="home">
                {!isCollapsed && "Home"}
            </MenuItem>
            <MenuItem isCollapsed={isCollapsed} icon="user">
                {!isCollapsed && "Profile"}
            </MenuItem>
            <div className={collapseButton}>
                <Button
                    onClick={() => {
                        setCollapsed(!isCollapsed);
                    }}
                >
                    <FontAwesomeIcon
                        icon={isCollapsed ? "angle-right" : "angle-left"}
                    />
                </Button>
            </div>
        </div>
    );
};
