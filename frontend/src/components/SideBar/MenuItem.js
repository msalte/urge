import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default ({ icon, onClick, isCollapsed, isActive, link, children }) => {
    return (
        <Link
            onClick={() => onClick()}
            to={link}
            className={classNames(styles.menuItem, {
                [styles.active]: isActive,
            })}
        >
            <div
                className={classNames(styles.icon, {
                    [styles.collapsed]: isCollapsed,
                    [styles.active]: isActive,
                })}
            >
                <FontAwesomeIcon icon={icon} />
            </div>
            {children}
        </Link>
    );
};

export const ExternalMenuItem = ({ icon, link, isCollapsed, children }) => {
    return (
        <a href={link} target="_blank" className={styles.menuItem}>
            <div
                className={classNames(styles.icon, {
                    [styles.collapsed]: isCollapsed,
                })}
            >
                <FontAwesomeIcon icon={icon} />
            </div>
            {children}
            {!isCollapsed && (
                <FontAwesomeIcon
                    icon="external-link-alt"
                    className={styles.externalIcon}
                />
            )}
        </a>
    );
};
