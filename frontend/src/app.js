import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BlogPage from "./components/pages/blog";
import ArduinoPage from "./components/pages/arduino";
import TopBar from "./components/Topbar";
import styles from "./global/scss/app.scss";
import NavigationContext from "./NavigationContext";
import classNames from "classnames";
import SideBar from "./components/SideBar";
import { useCollapseToggler } from "./components/SideBar/hooks";
import ThemeContext, { themes } from "./ThemeContext";

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
    faLongArrowAltRight
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
    const [activeSideBarItem, setActiveSideBarItem] = useState(null);

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
                <TopBar
                    className={activeTheme === themes.dark ? styles.dark : null}
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
