import React, { Component } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

export const navbarItems = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Profile",
        link: "/profile",
    },
];

class NavbarItem extends Component {
    render() {
        const { isActive, item } = this.props;

        const className = classNames({
            [styles.item]: true,
            [styles.active]: isActive
        });

        return (
            <Link to={item.link} className={className} onClick={() => this.props.onClick(item.name)}>
                {item.name}
            </Link>
        )
    }
}

class Navbar extends Component {
    static Item = NavbarItem;
    render() {
        return (
            <div className={styles.navbar}>
                {this.props.children}
            </div>
        );
    }
}

export default Navbar;