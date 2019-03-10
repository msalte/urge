import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BlogPage from "./components/pages/blog";
import ArduinoPage from "./components/pages/arduino";
import UserPage from "./components/pages/user";
import TopBar from "./components/Topbar";
import styles from "./global/scss/app.scss";
import NavigationContext from "./NavigationContext";
import classNames from "classnames";
import SideBar from "./components/SideBar";
import { useCollapseToggler } from "./components/SideBar/hooks";
import ThemeContext, { themes } from "./ThemeContext";
import { UserContextStateProvider } from "./UserContext";

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
    faCodeBranch,
    faExternalLinkAlt,
    faBook,
    faChartBar,
    faLongArrowAltRight,
    faKey,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHome,
    faUser,
    faSun,
    faMoon,
    faSearch,
    faTimes,
    faAngleRight,
    faAngleLeft,
    faCodeBranch,
    faExternalLinkAlt,
    faBook,
    faChartBar,
    faLongArrowAltRight,
    faKey
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
    const [isCollapsed, toggleCollapsed] = useCollapseToggler();
    const [activeLocation, setActiveLocation] = useState(null);

    return (
        <UserContextStateProvider>
            <ThemeContext.Provider
                value={{
                    theme: activeTheme,
                    toggle: () => toggleTheme(),
                }}
            >
                <NavigationContext.Provider
                    value={{
                        activeLocation: activeLocation,
                        setActiveLocation: item => setActiveLocation(item),
                    }}
                >
                    <TopBar
                        className={
                            activeTheme === themes.dark ? styles.dark : null
                        }
                    />
                    <div
                        className={classNames(styles.container, {
                            [styles.dark]: activeTheme === themes.dark,
                        })}
                    >
                        <SideBar
                            isCollapsed={isCollapsed}
                            toggleCollapsed={toggleCollapsed}
                        />
                        <div
                            className={classNames(styles.content, {
                                [styles.collapsed]: isCollapsed,
                            })}
                        >
                            <Switch>
                                <Route
                                    path="/"
                                    exact
                                    render={props => <BlogPage {...props} />}
                                />
                                <Route
                                    path="/arduino"
                                    render={props => <ArduinoPage {...props} />}
                                />
                                <Route
                                    path="/user"
                                    render={props => <UserPage {...props} />}
                                />
                            </Switch>
                        </div>
                    </div>
                </NavigationContext.Provider>
            </ThemeContext.Provider>
        </UserContextStateProvider>
    );
};

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
