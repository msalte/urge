import React, { useState, useEffect } from "react";
import moment from "moment";

const locations = {
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
        subMenu: {
            isDefaultOpen: false,
            isParentSelectable: false,
            items: [],
        },
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

const NavigationContext = React.createContext({
    locations: {},
    activeLocation: {},
    activeSubMenuItem: {},
    setActiveLocation: () => {},
});

export const NavigationContextStateProvider = ({ children }) => {
    const [activeLocation, setActiveLocation] = useState(null);
    const [activeSubMenuItem, setActiveSubMenuItem] = useState(null);

    // TODO: fetch from server
    useEffect(() => {
        for (var i = 0; i < 3; i++) {
            const date = moment().subtract(i, "week");
            const dateStr = date.format("DD-MM-YYYY");

            locations.arduino.subMenu.items.push({
                key: dateStr,
                displayName: dateStr,
                link: `/arduino/${dateStr}`,
                trim: () => {
                    return date.format("DDMM");
                },
            });
        }
    }, []);

    const handleActiveSubMenuItemChanged = item => {
        setActiveSubMenuItem(item);
    };

    const handleActiveLocationChanged = loc => {
        setActiveLocation(loc);

        if (loc.subMenu) {
            // the new location has a sub menu, check if active sub menu item is present

            const subMenuItem = loc.subMenu.items.find(
                i => i === activeSubMenuItem
            );

            if (!subMenuItem && activeSubMenuItem) {
                handleActiveSubMenuItemChanged(null);
            }
        } else {
            handleActiveSubMenuItemChanged(null);
        }
    };

    return (
        <NavigationContext.Provider
            value={{
                locations,
                activeLocation,
                activeSubMenuItem,
                setActiveLocation: loc => handleActiveLocationChanged(loc),
                setActiveSubMenuItem: item =>
                    handleActiveSubMenuItemChanged(item),
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;
