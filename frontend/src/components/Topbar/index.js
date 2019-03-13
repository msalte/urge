import React, { useContext } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SearchBar from "components/SearchBar";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeContext, { themes } from "components/ThemeContext";
import NavigationContext from "components/NavigationContext";

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

                <Link to={navContext.locations.user.link}>
                    <Button
                        iconButton
                        primary={
                            navContext.activeLocation &&
                            navContext.activeLocation.key ===
                                navContext.locations.user.key
                        }
                    >
                        <FontAwesomeIcon
                            icon={navContext.locations.user.icon}
                        />
                    </Button>
                </Link>
            </div>
        </div>
    );
};
