import React, { useContext } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeContext, { themes } from "../../ThemeContext";
import NavigationContext, { Locations } from "../../NavigationContext";

export default props => {
    const themeContext = useContext(ThemeContext);
    const navContext = useContext(NavigationContext);

    return (
        <div className={classNames(styles.topbar, props.className)}>
            <Link to={"/"} className={styles.brand}>
                Urge
            </Link>
            <div className={styles.tools}>
                <SearchBar
                    onQueryChanged={q => {
                        console.log(q);
                    }}
                />
                <Button iconButton onClick={() => themeContext.toggle()}>
                    <FontAwesomeIcon
                        icon={
                            themeContext.theme === themes.dark ? "sun" : "moon"
                        }
                    />
                </Button>

                <Link to={Locations.user.link}>
                    <Button
                        iconButton
                        primary={
                            navContext.activeLocation &&
                            navContext.activeLocation.key === Locations.user.key
                        }
                    >
                        <FontAwesomeIcon icon={Locations.user.icon} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};
