import React, { useContext } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import ThemeContext from "../../ThemeContext";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TopbarLink = props => {
    const { isActive, item, onClick } = props;

    const className = classNames(styles.link, {
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

export default props => {
    const themeContext = useContext(ThemeContext);

    const className = classNames(styles.topbar, {
        [styles.dark]: themeContext.theme === "dark",
    });

    return (
        <div className={className}>
            <div className={styles.items}>
                <a onClick={() => {}} className={styles.brand}>
                    Urge
                </a>
                {props.children}
            </div>
            <div className={styles.tools}>
                <SearchBar
                    onQueryChanged={q => {
                        console.log(q);
                    }}
                />
                <div style={{ marginLeft: 10, width: 40 }}>
                    <Button onClick={() => themeContext.toggle()}>
                        <FontAwesomeIcon
                            icon={
                                themeContext.theme === "dark" ? "sun" : "moon"
                            }
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};
