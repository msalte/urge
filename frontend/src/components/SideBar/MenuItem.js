import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import SubMenu from "./SubMenu";
import NavigationContext from "components/NavigationContext";

export default ({ item, isCollapsed, isActive }) => {
    const navContext = useContext(NavigationContext);

    const { subMenu, link, icon, displayName } = item;
    const [isSubMenuOpen, setSubMenuOpen] = useState(
        subMenu && subMenu.isDefaultOpen
    );

    useEffect(() => {
        const { activeSubMenuItem } = navContext;
        if (subMenu && !isSubMenuOpen && activeSubMenuItem) {
            if (subMenu.items.find(i => i === activeSubMenuItem) !== -1) {
                setSubMenuOpen(true);
            }
        }
    }, [navContext]);

    const handleOnClick = e => {
        if (subMenu) {
            if (!subMenu.isParentSelectable) {
                e.preventDefault();
            }

            setSubMenuOpen(!isSubMenuOpen);
        }
    };

    return (
        <React.Fragment>
            <Link
                onClick={e => handleOnClick(e)}
                to={link}
                className={classNames(styles.menuItem, {
                    [styles.active]: isActive,
                })}
            >
                <div className={styles.item}>
                    <div
                        className={classNames(styles.icon, {
                            [styles.collapsed]: isCollapsed,
                            [styles.active]: isActive,
                        })}
                    >
                        <FontAwesomeIcon icon={icon} />
                    </div>
                    {!isCollapsed && displayName}
                </div>
                {subMenu && !isCollapsed && (
                    <div
                        className={classNames(styles.subMenuIcon, {
                            [styles.active]: isActive,
                        })}
                    >
                        <FontAwesomeIcon
                            icon={isSubMenuOpen ? "angle-up" : "angle-down"}
                        />
                    </div>
                )}
            </Link>
            {subMenu && (
                <SubMenu
                    isCollapsed={isCollapsed}
                    subMenu={subMenu}
                    isOpen={isSubMenuOpen}
                />
            )}
        </React.Fragment>
    );
};

export const ExternalMenuItem = ({ icon, link, isCollapsed, text }) => {
    return (
        <a href={link} target="_blank" className={styles.menuItem}>
            <div className={styles.item}>
                <div
                    className={classNames(styles.icon, {
                        [styles.collapsed]: isCollapsed,
                    })}
                >
                    <FontAwesomeIcon icon={icon} />
                </div>
                {!isCollapsed && text}
            </div>
            {!isCollapsed && (
                <FontAwesomeIcon
                    icon="external-link-alt"
                    className={styles.externalIcon}
                />
            )}
        </a>
    );
};
