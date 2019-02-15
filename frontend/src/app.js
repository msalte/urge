import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import Topbar from "./components/Topbar";
import styles from "./global/scss/app.scss";
import ThemeContext from "./ThemeContext";
import classNames from "classnames";
import SideBar from "./components/SideBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHome,
    faUser,
    faSun,
    faMoon,
    faSearch,
    faTimes,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHome,
    faUser,
    faSun,
    faMoon,
    faSearch,
    faTimes,
    faAngleRight,
    faAngleLeft
);

const App = () => {
    const [activeTheme, setActiveTheme] = useState("light");
    const [otherTheme, setOtherTheme] = useState("dark");

    const toggleTheme = () => {
        setActiveTheme(otherTheme);
        setOtherTheme(activeTheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: activeTheme,
                other: otherTheme,
                toggle: () => toggleTheme(),
            }}
        >
            <Topbar />
            <div
                className={classNames(styles.container, {
                    [styles.dark]: activeTheme === "dark",
                })}
            >
                <SideBar />
                <div className={styles.content}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={props => <Home {...props} />}
                        />
                        <Route
                            path="/profile"
                            render={props => <Profile {...props} />}
                        />
                    </Switch>
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
