import React, { useContext } from "react";

const NavigationContext = React.createContext({
    activeSideBarItem: {},
    setActiveSideBarItem: () => {},
});

export const SideBarItems = {
    home: {
        key: "home",
        displayName: "Home",
        icon: "home",
        link: "/",
    },
    profile: {
        key: "profile",
        displayName: "Profile",
        icon: "user",
        link: "/profile",
    },
};

export const ensureSideBarItemActive = item => {
    const ctx = useContext(NavigationContext);

    if (ctx.activeSideBarItem !== item) {
        ctx.setActiveSideBarItem(item);
    }
};

export default NavigationContext;
