import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import TopBar from "./components/Topbar";
import styles from "./global/scss/app.scss";
import ThemeContext, { themes } from "./ThemeContext";
import NavigationContext, { SideBarItems } from "./NavigationContext";
import classNames from "classnames";
import SideBar from "./components/SideBar";
import Div100vh from "react-div-100vh";

import "typeface-nunito";
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

const useThemeToggler = () => {
    const defaultState = localStorage.getItem("theme") || themes.light;
    const [activeTheme, setActiveTheme] = useState(defaultState);
    const toggleTheme = () => {
        const newTheme =
            activeTheme === themes.light ? themes.dark : themes.light;

        setActiveTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return [activeTheme, toggleTheme];
};

const App = () => {
    const [activeTheme, toggleTheme] = useThemeToggler();

    const [activeSideBarItem, setActiveSideBarItem] = useState(
        SideBarItems.home
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
                    activeSideBarItem: activeSideBarItem,
                    setActiveSideBarItem: item => setActiveSideBarItem(item),
                }}
            >
                <Div100vh>
                    <TopBar />
                    <div
                        className={classNames(styles.container, {
                            [styles.dark]: activeTheme === themes.dark,
                        })}
                    >
                        <SideBar activeKey={activeSideBarItem} />
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
                </Div100vh>
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
