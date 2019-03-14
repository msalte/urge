import React, { useContext } from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import NavigationContext from "components/NavigationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ isCollapsed, isOpen, subMenu }) => {
    const navContext = useContext(NavigationContext);
    const { activeSubMenuItem } = navContext;

    const handleItemClick = (event, item) => {
        if (activeSubMenuItem === item && event) {
            event.preventDefault();
        } else {
            navContext.setActiveSubMenuItem(item);
        }
    };

    return (
        <div
            className={classNames(styles.subMenu, {
                [styles.closed]: !isOpen,
                [styles.active]: activeSubMenuItem,
            })}
        >
            {subMenu.items.map(item => {
                return (
                    <Link
                        className={classNames(styles.item, {
                            [styles.active]: activeSubMenuItem === item,
                            [styles.collapsed]: isCollapsed,
                            [styles.admin]: item.isAdmin,
                        })}
                        key={item.key}
                        to={item.link}
                        onClick={e => {
                            handleItemClick(e, item);
                        }}
                    >
                        {!isCollapsed && item.displayName}
                        {isCollapsed && !item.isAdmin && item.trim()}
                        {item.isAdmin && (
                            <FontAwesomeIcon
                                className={styles.icon}
                                icon="key"
                            />
                        )}
                    </Link>
                );
            })}
        </div>
    );
};
