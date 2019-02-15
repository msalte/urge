import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import { Navbar, NavbarItem } from "./components/Navbar";
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

const navbarItems = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Profile",
        link: "/profile",
    },
];

const App = () => {
    const [activeTheme, setActiveTheme] = useState("light");
    const [otherTheme, setOtherTheme] = useState("dark");

    const [activeItem, setActiveItem] = useState(navbarItems[0].name);

    const toggleTheme = () => {
        setActiveTheme(otherTheme);
        setOtherTheme(activeTheme);
    };

    const className = classNames(styles.container, {
        [styles.dark]: activeTheme === "dark",
    });

    return (
        <ThemeContext.Provider
            value={{
                theme: activeTheme,
                other: otherTheme,
                toggle: () => toggleTheme(),
            }}
        >
            <Navbar>
                {/* {navbarItems.map((item, key) => (
                    <NavbarItem
                        key={key}
                        item={item}
                        isActive={activeItem === item.name}
                        onClick={name => setActiveItem(name)}
                    />
                ))} */}
            </Navbar>
            <div className={className}>
                <SideBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route
                        path="/profile"
                        render={props => <Profile {...props} />}
                    />
                </Switch>
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
