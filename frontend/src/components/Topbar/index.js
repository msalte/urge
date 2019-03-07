import React, { useContext } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeContext, { themes } from "../../ThemeContext";

export const TopBarLink = props => {
    const { isActive, item, onClick } = props;

    return (
        <Link
            to={item.link}
            className={classNames(styles.link, {
                [styles.active]: isActive,
            })}
            onClick={() => onClick(item.name)}
        >
            {item.name}
        </Link>
    );
};

export default props => {
    const themeContext = useContext(ThemeContext);

    return (
        <div className={classNames(styles.topbar, props.className)}>
            <div className={styles.items}>
                <Link to={"/"} className={styles.brand}>
                    Urge
                </Link>
                {props.children}
            </div>
            <div className={styles.tools}>
                <SearchBar
                    onQueryChanged={q => {
                        console.log(q);
                    }}
                />
                <div className={styles.themeButton}>
                    <Button
                        stretch
                        iconButton
                        onClick={() => themeContext.toggle()}
                    >
                        <FontAwesomeIcon
                            icon={
                                themeContext.theme === themes.dark
                                    ? "sun"
                                    : "moon"
                            }
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};
