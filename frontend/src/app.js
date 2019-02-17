import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import Topbar from "./components/Topbar";
import styles from "./global/scss/app.scss";
import ThemeContext, { themes } from "./ThemeContext";
import NavigationContext, { SideBarItems } from "./NavigationContext";

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
    const [activeTheme, setActiveTheme] = useState(themes.light);
    const toggleTheme = () => {
        setActiveTheme(
            activeTheme === themes.light ? themes.dark : themes.light
        );
    };

    const [activeSideBarKey, setActiveSideBarKey] = useState(
        SideBarItems.home.key
    );

    return (
        <ThemeContext.Provider
            value={{
                theme: activeTheme,
                toggle: () => toggleTheme(),
            }}
        >
            <NavigationContext.Provider
                value={{
                    activeSideBarKey: activeSideBarKey,
                    setActiveSideBarKey: key => setActiveSideBarKey(key),
                }}
            >
                <Topbar />
                <div
                    className={classNames(styles.container, {
                        [styles.dark]: activeTheme === themes.dark,
                    })}
                >
                    <SideBar activeKey={activeSideBarKey} />
                    <div className={styles.content}>
                        <Switch>
                            <Route path="/" exact render={Home} />
                            <Route
                                path="/profile"
                                render={props => <Profile {...props} />}
                            />
                        </Switch>
                    </div>
                </div>
            </NavigationContext.Provider>
        </ThemeContext.Provider>
    );
};

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
