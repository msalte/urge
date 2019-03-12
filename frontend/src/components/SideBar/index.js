import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem, { ExternalMenuItem } from "./MenuItem";
import NavigationContext, { Locations } from "components/NavigationContext";
import { LargerThanPhone } from "components/Responsive";

export default ({ isCollapsed, toggleCollapsed }) => {
    const navContext = React.useContext(NavigationContext);

    return (
        <div
            className={classNames(styles.sideBar, {
                [styles.collapsed]: isCollapsed === true,
            })}
        >
            {Object.keys(Locations).map(key => {
                const item = Locations[key];

                if (item.visibleInSideBar === false) return null;

                if (item.isExternal) {
                    return (
                        <ExternalMenuItem
                            key={key}
                            link={item.link}
                            isCollapsed={isCollapsed}
                            icon={item.icon}
                        >
                            {!isCollapsed && `${item.displayName}`}
                        </ExternalMenuItem>
                    );
                }

                return (
                    <MenuItem
                        key={key}
                        link={item.link}
                        isCollapsed={isCollapsed}
                        isActive={navContext.activeLocation === item}
                        icon={item.icon}
                        onClick={() => {
                            /* ignore, required to avoid page re-load  */
                        }}
                    >
                        {!isCollapsed && `${item.displayName}`}
                    </MenuItem>
                );
            })}
            <LargerThanPhone>
                <div
                    className={classNames(styles.collapseButton, {
                        [styles.collapsed]: isCollapsed === true,
                    })}
                >
                    <Button
                        iconButton
                        stretch
                        onClick={() => toggleCollapsed()}
                    >
                        <FontAwesomeIcon
                            icon={isCollapsed ? "angle-right" : "angle-left"}
                        />
                    </Button>
                </div>
            </LargerThanPhone>
        </div>
    );
};
