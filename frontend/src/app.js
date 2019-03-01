import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BlogPage from "./components/pages/blog";
import UserPage from "./components/pages/user";
import TopBar from "./components/Topbar";
import styles from "./global/scss/app.scss";
import ThemeContext, { themes } from "./ThemeContext";
import NavigationContext, { SideBarItems } from "./NavigationContext";
import classNames from "classnames";
import SideBar from "./components/SideBar";
import { useCollapseToggler } from "./components/SideBar/hooks";

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
    const [isCollapsed, toggleCollapsed] = useCollapseToggler();

    const [activeSideBarItem, setActiveSideBarItem] = useState(
        SideBarItems.blog
    );

    useEffect(() => {
        const root = document.documentElement;

        switch (activeTheme) {
            case themes.light:
                root.style.setProperty("background", "#fff");
                break;
            case themes.dark:
                root.style.setProperty("background", "#666");
                break;
        }
    }, [activeTheme]);

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
                <TopBar />
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
                                path="/user"
                                render={props => <UserPage {...props} />}
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
