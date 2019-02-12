import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

export const NavbarItem = props => {
    const { isActive, item, onClick } = props;

    const className = classNames({
        [styles.item]: true,
        [styles.active]: isActive,
    });

    return (
        <Link
            to={item.link}
            className={className}
            onClick={() => onClick(item.name)}
        >
            {item.name}
        </Link>
    );
};

export const Navbar = props => {
    return <div className={styles.navbar}>{props.children}</div>;
};
