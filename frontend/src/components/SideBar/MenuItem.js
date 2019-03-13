import React, { useState } from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import SubMenu from "./SubMenu";

export default ({ item, onClick, isCollapsed, isActive }) => {
    const { subMenu, link, icon, displayName } = item;

    const [isSubMenuOpen, setSubMenuOpen] = useState(
        subMenu && subMenu.isDefaultOpen
    );

    const handleOnClick = e => {
        if (subMenu) {
            if (!subMenu.parentSelectable) {
                e.preventDefault();
            }

            setSubMenuOpen(!isSubMenuOpen);
        } else {
            onClick();
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
                    items={subMenu.items}
                    isOpen={isSubMenuOpen}
                    parentLocation={item}
                    onOpen={() => setSubMenuOpen(true)}
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
