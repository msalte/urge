import React, { useContext } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import BlogPage from "components/Pages/Blog";
import ArduinoPage from "components/Pages/Arduino";
import ArduinoAdminPage from "components/Pages/Arduino/Admin";
import UserPage, { UserLoggedInRedirect } from "components/Pages/User";
import TopBar from "components/Topbar";
import styles from "global/scss/app.scss";
import { NavigationContextStateProvider } from "components/NavigationContext";
import classNames from "classnames";
import SideBar from "components/SideBar";
import { useCollapseToggler } from "components/SideBar/hooks";
import ThemeContext, { ThemeContextStateProvider, themes } from "components/ThemeContext";
import { UserContext, UserContextStateProvider } from "components/UserContext";

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
    faAngleUp,
    faAngleDown,
    faCodeBranch,
    faExternalLinkAlt,
    faBook,
    faChartBar,
    faLongArrowAltRight,
    faKey,
    faEnvelope,
    faTag,
    faIdCard,
    faExclamationTriangle,
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
    faAngleUp,
    faAngleDown,
    faCodeBranch,
    faExternalLinkAlt,
    faBook,
    faChartBar,
    faLongArrowAltRight,
    faKey,
    faEnvelope,
    faTag,
    faIdCard,
    faExclamationTriangle
);

const AppContainerWithTopBar = ({ children }) => {
    const themeContext = useContext(ThemeContext);

    document.documentElement.style.setProperty(
        "background",
        themeContext.theme === themes.dark ? "#666" : "#fff"
    );

    return (
        <React.Fragment>
            <TopBar className={themeContext.theme === themes.dark ? styles.dark : null} />
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

const PrivateRoute = props => {
    const userContext = useContext(UserContext);

    if (userContext.isAuthenticated) {
        return <Route {...props} />;
    }

    return <Redirect to="/user" />;
};

const App = () => {
    const [isCollapsed, toggleCollapsed] = useCollapseToggler();

    return (
        <UserContextStateProvider>
            <ThemeContextStateProvider>
                <NavigationContextStateProvider>
                    <AppContainerWithTopBar>
                        <SideBar isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />
                        <div
                            className={classNames(styles.content, {
                                [styles.collapsed]: isCollapsed,
                            })}
                        >
                            <Switch>
                                <Route path="/" exact render={props => <BlogPage {...props} />} />
                                <PrivateRoute
                                    exact
                                    path="/arduino/admin"
                                    render={props => <ArduinoAdminPage {...props} />}
                                />
                                <Route
                                    path="/arduino/:date"
                                    render={props => <ArduinoPage {...props} />}
                                />
                                <Route
                                    path="/user/loggedin"
                                    exact
                                    render={() => <UserLoggedInRedirect />}
                                />
                                <Route path="/user" render={props => <UserPage {...props} />} />
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
