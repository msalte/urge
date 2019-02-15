import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "./MenuItem";
import ThemeContext from "../../ThemeContext";

export default props => {
    const [isCollapsed, setCollapsed] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState("home");
    const themeContext = React.useContext(ThemeContext);

  
    console.log(props);
    return (
        <div
            className={classNames(styles.sideBar, {
                [styles.collapsed]: isCollapsed === true,
                [styles.dark]: themeContext.theme === "dark",
            })}
        >
            <MenuItem
                link="/"
                isCollapsed={isCollapsed}
                isActive={activeItem === "home"}
                icon="home"
                onClick={() => setActiveItem("home")}
            >
                {!isCollapsed && "Home"}
            </MenuItem>
            <MenuItem
                link="/profile"
                isCollapsed={isCollapsed}
                isActive={activeItem === "profile"}
                icon="user"
                onClick={() => setActiveItem("profile")}
            >
                {!isCollapsed && "Profile"}
            </MenuItem>
            <div
                className={classNames(styles.collapseButton, {
                    [styles.collapsed]: isCollapsed === true,
                })}
            >
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
