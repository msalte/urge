import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default props => {
    const { icon, onClick, isCollapsed, isActive, link } = props;

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
            {props.children}
        </Link>
    );
};
