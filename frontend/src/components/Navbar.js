import React, { useContext } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ThemeContext from "../ThemeContext";
import Button from "../components/Button";

export const NavbarItem = props => {
    const { isActive, item, onClick } = props;

    const className = classNames(styles.item, {
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
    const themeContext = useContext(ThemeContext);

    const className = classNames(styles.navBar, {
        [styles.dark]: themeContext.theme === "dark",
    });

    return (
        <div className={className}>
            {props.children}
            <SearchBar
                onQueryChanged={q => {
                    console.log(q);
                }}
            />
            <Button onClick={() => themeContext.toggle()}>
                Set {themeContext.other} theme
            </Button>
        </div>
    );
};
