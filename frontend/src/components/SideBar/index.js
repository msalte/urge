import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "./MenuItem";
import ThemeContext, { themes } from "../../ThemeContext";
import NavigationContext, { SideBarItems } from "../../NavigationContext";

export default () => {
    const [isCollapsed, setCollapsed] = React.useState(false);

    const themeContext = React.useContext(ThemeContext);
    const navigationContext = React.useContext(NavigationContext);

    return (
        <div
            className={classNames(styles.sideBar, {
                [styles.collapsed]: isCollapsed === true,
                [styles.dark]: themeContext.theme === themes.dark,
            })}
        >
            {Object.keys(SideBarItems).map(key => {
                const item = SideBarItems[key];

                return (
                    <MenuItem
                        key={key}
                        link={item.link}
                        isCollapsed={isCollapsed}
                        isActive={navigationContext.activeSideBarKey === key}
                        icon={item.icon}
                        onClick={() =>
                            navigationContext.setActiveSideBarKey(key)
                        }
                    >
                        {!isCollapsed && `${item.displayName}`}
                    </MenuItem>
                );
            })}
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
