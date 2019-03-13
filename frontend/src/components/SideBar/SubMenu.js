import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import NavigationContext from "components/NavigationContext";

export default ({ isOpen, items, parentLocation, isCollapsed, onOpen }) => {
    const [activeItem, setActiveItem] = useState(null);
    const navContext = useContext(NavigationContext);

    useEffect(() => {
        const { activeLocation, activeSubMenuItem } = navContext;

        if (activeLocation !== parentLocation) {
            // The user navigated away from parent:
            // Reset selected item in sub menu.
            if (activeItem) {
                setActiveItem(null);
            }
        } else if (activeSubMenuItem && activeSubMenuItem !== activeItem) {
            // Navigation context has an active sub menu item.
            // Force that item here. This can happen if user arrives directly on
            // a sub menu item from an URL.
            setActiveItem(activeSubMenuItem);
            onOpen();
        }
    }, [navContext]);

    return (
        <div
            className={classNames(styles.subMenu, {
                [styles.closed]: !isOpen,
                [styles.active]: activeItem,
            })}
        >
            {items.map(item => {
                return (
                    <Link
                        className={classNames(styles.item, {
                            [styles.active]: activeItem === item,
                            [styles.collapsed]: isCollapsed,
                        })}
                        key={item.key}
                        to={item.link}
                        onClick={() => {
                            setActiveItem(item);
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
