import React, { useContext } from "react";

const NavigationContext = React.createContext({
    activeLocation: {},
    setActiveLocation: () => {},
});

export const Locations = {
    blog: {
        key: "blog",
        displayName: "Blog",
        icon: "book",
        link: "/",
    },
    arduino: {
        key: "arduino",
        displayName: "Arduino",
        icon: "chart-bar",
        link: "/arduino",
    },
    github: {
        key: "github",
        displayName: "GitHub",
        icon: "code-branch",
        isExternal: true,
        link: "https://github.com/msalte/urge",
    },
    user: {
        key: "user",
        displayName: "User",
        icon: "user",
        link: "/user",
        visibleInSideBar: false,
    },
};

export const ensureActiveLocation = item => {
    const ctx = useContext(NavigationContext);

    if (ctx.activeLocation !== item) {
        ctx.setActiveLocation(item);
    }
};

export default NavigationContext;
