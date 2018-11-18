import React, { Component } from "react";
import styles from "./styles.scss";
import classNames from "classnames";

class NavbarItem extends Component {
    render() {
        const { isActive } = this.props;

        const className = classNames({
            [styles.item]: true,
            [styles.active]: isActive
        });

        return (
            <div className={className}>{this.props.name}</div>
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