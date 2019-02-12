import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import { Navbar, NavbarItem } from "./components/Navbar";
import styles from "./global/scss/app.scss";
import ThemeContext from "./ThemeContext";

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
    const [theme, setTheme] = useState("light");
    const [activeItem, setActiveItem] = useState(navbarItems[0].name);

    const handleThemeChanged = theme => {
        navbarItems.forEach(item => {
            item.link = `/${theme}${item.link}`;
        });

        setTheme(theme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                updateTheme: t => handleThemeChanged(t),
            }}
        >
            <Navbar>
                {navbarItems.map((item, key) => (
                    <NavbarItem
                        key={key}
                        item={item}
                        isActive={activeItem === item.name}
                        onClick={name => setActiveItem(name)}
                    />
                ))}
            </Navbar>
            <div className={styles.container}>
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
