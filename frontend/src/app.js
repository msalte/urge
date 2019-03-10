import React, { useContext } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BlogPage from "./components/pages/blog";
import ArduinoPage from "./components/pages/arduino";
import UserPage from "./components/pages/user";
import TopBar from "./components/Topbar";
import styles from "./global/scss/app.scss";
import { NavigationContextStateProvider } from "./NavigationContext";
import classNames from "classnames";
import SideBar from "./components/SideBar";
import { useCollapseToggler } from "./components/SideBar/hooks";
import ThemeContext, {
    ThemeContextStateProvider,
    themes,
} from "./ThemeContext";
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

const AppContainerWithTopBar = ({ children }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <React.Fragment>
            <TopBar
                className={
                    themeContext.theme === themes.dark ? styles.dark : null
                }
            />
            <div
                className={classNames(styles.container, {
                    [styles.dark]: themeContext.theme === themes.dark,
                })}
            >
                {children}
            </div>
        </React.Fragment>
    );
};

const App = () => {
    const [isCollapsed, toggleCollapsed] = useCollapseToggler();

    return (
        <UserContextStateProvider>
            <ThemeContextStateProvider>
                <NavigationContextStateProvider>
                    <AppContainerWithTopBar>
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
                    </AppContainerWithTopBar>
                </NavigationContextStateProvider>
            </ThemeContextStateProvider>
        </UserContextStateProvider>
    );
};

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
