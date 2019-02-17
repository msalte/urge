import React from "react";

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

export default React.createContext({
    activeSideBarKey: "",
    setActiveSideBarKey: () => {},
});
