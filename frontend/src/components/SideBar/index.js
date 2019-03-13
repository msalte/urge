import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem, { ExternalMenuItem } from "./MenuItem";
import NavigationContext from "components/NavigationContext";
import { LargerThanPhone } from "components/Responsive";

export default ({ isCollapsed, toggleCollapsed }) => {
    const navContext = React.useContext(NavigationContext);

    return (
        <div
            className={classNames(styles.sideBar, {
                [styles.collapsed]: isCollapsed === true,
            })}
        >
            {Object.keys(navContext.locations).map(key => {
                const item = navContext.locations[key];

                if (item.visibleInSideBar === false) return null;

                if (item.isExternal) {
                    return (
                        <ExternalMenuItem
                            key={key}
                            text={item.displayName}
                            link={item.link}
                            isCollapsed={isCollapsed}
                            icon={item.icon}
                        />
                    );
                }

                return (
                    <MenuItem
                        key={key}
                        isCollapsed={isCollapsed}
                        isActive={navContext.activeLocation === item}
                        item={item}
                        onClick={() => {
                            /* ignore, required to avoid page re-load  */
                        }}
                    />
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
