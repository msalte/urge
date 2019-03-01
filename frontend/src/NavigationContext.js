import React, { useContext } from "react";

const NavigationContext = React.createContext({
    activeSideBarItem: {},
    setActiveSideBarItem: () => {},
});

export const SideBarItems = {
    blog: {
        key: "blog",
        displayName: "Blog",
        icon: "home",
        link: "/",
    },
    user: {
        key: "user",
        displayName: "User",
        icon: "user",
        link: "/user",
    },
};

export const ensureSideBarItemActive = item => {
    const ctx = useContext(NavigationContext);

    if (ctx.activeSideBarItem !== item) {
        ctx.setActiveSideBarItem(item);
    }
};

export default NavigationContext;
