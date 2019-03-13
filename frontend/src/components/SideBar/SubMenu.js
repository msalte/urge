import React, { useContext } from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import NavigationContext from "components/NavigationContext";

export default ({ isCollapsed, isOpen, subMenu }) => {
    const navContext = useContext(NavigationContext);
    const { activeSubMenuItem } = navContext;

    const handleItemClick = (e, item) => {
        if (activeSubMenuItem === item) {
            e.preventDefault();
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
                        })}
                        key={item.key}
                        to={item.link}
                        onClick={e => {
                            handleItemClick(e, item);
                        }}
                    >
                        {!isCollapsed && item.displayName}
                        {isCollapsed && item.trim()}
                    </Link>
                );
            })}
        </div>
    );
};
